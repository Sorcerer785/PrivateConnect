# 🔒 PrivateConnect

A privacy-focused decentralized messaging platform built on Internet Computer Protocol (ICP) and Calimero Network.

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Frontend
        UI[React UI]
        Theme[Theme Provider]
        Auth[Auth Client]
        Crypto[Crypto Module]
    end

    subgraph Backend
        ICP[ICP Canister]
        Storage[Message Storage]
        Identity[Identity Management]
    end

    subgraph Security
        E2E[End-to-End Encryption]
        Meta[Metadata Protection]
        SD[Self-Destruct Messages]
    end

    UI --> Auth
    UI --> Theme
    UI --> Crypto
    Crypto --> E2E
    Auth --> Identity
    ICP --> Storage
    ICP --> Meta
    Storage --> SD
    
    classDef primary fill:#0084ff,stroke:#0073e6,stroke-width:2px,color:white
    classDef secondary fill:#2d2d2d,stroke:#404040,stroke-width:2px,color:white
    classDef accent fill:#00b4d8,stroke:#0099b8,stroke-width:2px,color:white
    
    class UI,ICP primary
    class Auth,Storage,E2E secondary
    class Theme,Crypto,Identity,Meta,SD accent
```



## 🎨 Theme System

```mermaid
graph LR
    subgraph Theme Management
        Context[Theme Context]
        Provider[Theme Provider]
        Storage[Local Storage]
    end

    subgraph Themes
        Light[Light Theme]
        Dark[Dark Theme]
    end

    subgraph Components
        UI[UI Elements]
        Messages[Message Display]
        Inputs[Input Fields]
    end

    Context --> Provider
    Provider --> Light
    Provider --> Dark
    Provider --> Storage
    Light --> UI
    Dark --> UI
    UI --> Messages
    UI --> Inputs

    classDef primary fill:#0084ff,stroke:#0073e6,stroke-width:2px,color:white
    classDef secondary fill:#2d2d2d,stroke:#404040,stroke-width:2px,color:white
    classDef accent fill:#00b4d8,stroke:#0099b8,stroke-width:2px,color:white

    class Context,Provider primary
    class Light,Dark secondary
    class UI,Messages,Inputs,Storage accent
```

## ✨ Features

- 🔒 End-to-end encrypted messaging
- 🕒 Self-destructing messages
- 🎭 Private metadata handling
- 🌓 Dark/Light theme support
- 🔑 Internet Identity authentication
- 📱 Responsive design

## 🛠️ Technology Stack

- **Frontend**:
  - React.js
  - Styled Components
  - TweetNaCl.js (Encryption)
  - Internet Identity SDK

- **Backend**:
  - Internet Computer Protocol (ICP)
  - Motoko
  - Calimero Network SDK

## 🚀 Getting Started

### Prerequisites

```bash
# Install the DFINITY Canister SDK
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Install project dependencies
npm install
```

### Development

```bash
# Start the local ICP network
dfx start --background

# Deploy the canisters
dfx deploy

# Start the development server
npm start
```

## 💻 Project Structure

```mermaid
graph TD
    subgraph Project Structure
        Root[PrivateConnect]
        Src[src]
        Public[public]
        Config[Configuration Files]
    end

    subgraph Source Code
        Frontend[Frontend]
        Backend[Backend]
        Theme[Theme]
    end

    Root --> Src
    Root --> Public
    Root --> Config
    Src --> Frontend
    Src --> Backend
    Frontend --> Theme

    classDef primary fill:#0084ff,stroke:#0073e6,stroke-width:2px,color:white
    classDef secondary fill:#2d2d2d,stroke:#404040,stroke-width:2px,color:white
    classDef accent fill:#00b4d8,stroke:#0099b8,stroke-width:2px,color:white

    class Root,Src primary
    class Frontend,Backend secondary
    class Public,Config,Theme accent
```

## 🔐 Security Features

1. **End-to-End Encryption**:
   - TweetNaCl.js for encryption
   - Secure key exchange
   - Zero-knowledge message content

2. **Metadata Protection**:
   - Calimero Network integration
   - Protected user identities
   - Encrypted timestamps

3. **Self-Destructing Messages**:
   - Time-based message expiry
   - Secure message deletion
   - No message persistence

## 🎨 UI/UX Features

1. **Theme Support**:
   - Dark/Light mode toggle
   - System theme detection
   - Persistent theme preference
   - Smooth theme transitions

2. **Responsive Design**:
   - Mobile-first approach
   - Fluid layouts
   - Optimized for all devices

3. **Modern Interface**:
   - Gradient accents
   - Card-based design
   - Interactive elements
   - Visual feedback

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- ICP Hub Bulgaria
- Calimero Network Team
- DFINITY Foundation
