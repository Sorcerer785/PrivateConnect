export const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({
    'id' : IDL.Text,
    'content' : IDL.Text,
    'sender' : IDL.Principal,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'deleteMessage' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getMessages' : IDL.Func([], [IDL.Vec(Message)], []),
    'sendMessage' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
