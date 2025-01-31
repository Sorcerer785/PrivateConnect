import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Debug "mo:base/Debug"; // For console logs

actor ChatApp {
    // Define Message Type
    type Message = {
        id: Text;
        content: Text;
        sender: Principal;
        timestamp: Int;
    };

    // Store messages in a HashMap
    private var messages = HashMap.HashMap<Text, Message>(0, Text.equal, Text.hash);

    // Send a Message
    public shared(msg) func sendMessage(content: Text) : async Text {
        let sender = msg.caller;
        let messageId = Int.toText(Time.now()); // Unique ID using timestamp
        let message: Message = {
            id = messageId;
            content = content;
            sender = sender;
            timestamp = Time.now();
        };

        messages.put(messageId, message);

        // Debug log
        Debug.print("Message Sent: " # messageId # " | Content: " # content);

        return messageId;
    };

    // Get All Messages
    public shared func getMessages() : async [Message] {
        let allMessages = Iter.toArray(messages.vals());

        // Debug log
        Debug.print("Fetching Messages...");
        for (msg in allMessages.vals()) {
            Debug.print("ID: " # msg.id # " | Content: " # msg.content);
        };

        return allMessages;
    };

    // Delete a Message
    public shared(msg) func deleteMessage(messageId: Text) : async Bool {
        switch (messages.get(messageId)) {
            case (?message) {
                messages.delete(messageId);
                Debug.print("Deleted Message: " # messageId);
                return true;
            };
            case (null) {
                Debug.print("Message Not Found: " # messageId);
                return false;
            };
        };
    };
}
