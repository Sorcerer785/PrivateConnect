import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { box, randomBytes } from 'tweetnacl';
import { encodeBase64, decodeBase64 } from 'tweetnacl-util';
import styled, { createGlobalStyle } from 'styled-components';
import { useTheme } from './ThemeContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: ${props => props.theme.surface};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.shadow};
`;

const Logo = styled.h1`
  margin: 0;
  background: linear-gradient(135deg, ${props => props.theme.gradientStart}, ${props => props.theme.gradientEnd});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  flex: 1;
`;

const Card = styled.div`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  margin-bottom: 2rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
  background: ${props => props.theme.background};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.border};
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 12px;
  max-width: 70%;
  ${props => props.sent
    ? `margin-left: auto;
       background: ${props.theme.messageSentBackground};
       color: ${props.theme.messageSentText};`
    : `background: ${props.theme.messageBackground};
       color: ${props.theme.text};`}
  box-shadow: ${props => props.theme.shadow};
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  width: 100%;
  margin: 0.5rem 0;
  background: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}33;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.secondary && `
    background: transparent;
    border: 1px solid ${props.theme.primary};
    color: ${props.theme.primary};

    &:hover {
      background: ${props.theme.primary}11;
    }
  `}
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary}22;
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [identity, setIdentity] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [keyPair, setKeyPair] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    initializeAuth();
    generateKeyPair();
  }, []);

  const initializeAuth = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    }
  };

  const generateKeyPair = () => {
    const generatedKeyPair = box.keyPair();
    setKeyPair(generatedKeyPair);
  };

  const handleAuthenticated = async (authClient) => {
    const identity = await authClient.getIdentity();
    setIdentity(identity);
    fetchMessages();
  };

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: process.env.II_URL,
      onSuccess: () => handleAuthenticated(authClient),
    });
  };

  const encryptMessage = (message, recipientPublicKey) => {
    const ephemeralKeyPair = box.keyPair();
    const sharedKey = box.before(recipientPublicKey, ephemeralKeyPair.secretKey);
    const nonce = randomBytes(box.nonceLength);
    const encryptedMessage = box.after(
      decodeUTF8(message),
      nonce,
      sharedKey
    );
    return {
      encrypted: encodeBase64(encryptedMessage),
      nonce: encodeBase64(nonce),
      ephemeralPublicKey: encodeBase64(ephemeralKeyPair.publicKey)
    };
  };

  const decryptMessage = (encryptedData) => {
    const { encrypted, nonce, ephemeralPublicKey } = encryptedData;
    const sharedKey = box.before(
      decodeBase64(ephemeralPublicKey),
      keyPair.secretKey
    );
    const decryptedMessage = box.open.after(
      decodeBase64(encrypted),
      decodeBase64(nonce),
      sharedKey
    );
    return encodeUTF8(decryptedMessage);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !recipient.trim()) return;

    try {
      // Add message to UI immediately for better UX
      const tempMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender: identity.getPrincipal().toString(),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      // Actually send the encrypted message
      const encryptedData = encryptMessage(newMessage, recipient);
      // Call ICP canister to send message
      console.log('Sending encrypted message:', encryptedData);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const fetchMessages = async () => {
    // Placeholder for actual message fetching
    console.log('Fetching messages...');
  };

  return (
    <AppWrapper>
      <GlobalStyle />
      <Header>
        <Logo>PrivateConnect</Logo>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '🌞' : '🌙'}
        </ThemeToggle>
      </Header>
      <Container>
        {!identity ? (
          <Card>
            <h2>Welcome to PrivateConnect</h2>
            <p>Secure, private messaging for everyone.</p>
            <Button onClick={login}>Login with Internet Identity</Button>
          </Card>
        ) : (
          <>
            <Card>
              <Input
                placeholder="Recipient's Principal ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <MessageContainer>
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    sent={msg.sender === identity.getPrincipal().toString()}
                  >
                    {msg.content}
                  </Message>
                ))}
              </MessageContainer>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send Message</Button>
            </Card>
          </>
        )}
      </Container>
    </AppWrapper>
  );
}

export default App;
