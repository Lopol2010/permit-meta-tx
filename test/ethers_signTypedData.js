const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");
const { signERC2612Permit } = require("eth-permit");
const getTypedData = require("./util");

describe("Greeter", function () {
  it("Define generals", async function () {
    [owner, spender, caller] = await hre.ethers.getSigners();
    provider = ethers.provider

    value = 1;
    deadline = Math.floor(Date.now() / 1000) + 1200;
  })
  it("Deploy", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();
  });
  it("Create meta tx", async function () {
    
    // Create data structure that describes meta-tx
    typedData = getTypedData(
      "jej", 
      31337, 
      greeter.address,
      owner.address,
      spender.address,
      value,
      Number(await greeter.nonces(owner.address)),
      deadline
    );

    // Get Permit type
    const { EIP712Domain: _unused, ...types } = typedData.types;
    // Sign data (args to be passed in permit function) 
    // with Permit type for domain. The Domain type is unused because it's a standard I guess.
    const signed = await owner._signTypedData(typedData.domain, types, typedData.message)
    // Parse value into r s v 
    signature = ethers.utils.splitSignature(signed);

  });
  it("Permit", async function () {
    const {v, r, s} = signature;
    // const {v, r, s} = result;
  
    // owner approve spender but caller do this call on behalf of owner
    await greeter.connect(caller).permit(
      owner.address,
      spender.address,
      value,
      deadline,
      v,
      r,
      s
    );

    await greeter.connect(spender)
      .transferFrom(owner.address, greeter.address, 1);
    expect(await greeter.balanceOf(greeter.address)).to.be.equal(1);

  });
});

























EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
]
Permit = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
]