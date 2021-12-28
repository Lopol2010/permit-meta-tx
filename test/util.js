
module.exports = getTypedData = (name, chainId, verifyingContract, owner, spender, value, nonce, deadline) => {
  return {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ]
    },
    primaryType: "Permit",

    // --- DATA ---
    domain: {
      name,
      version: '1',
      chainId,
      verifyingContract
    },
    message: {
      owner,
      spender,
      value,
      nonce,
      deadline,
    },
  }
}
