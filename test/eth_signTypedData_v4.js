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

    result = await provider.send('eth_signTypedData_v4', [
      owner.address, 
      JSON.stringify(typedData)
    ]);
     
  });
  it("Permit", async function () {
    r= result.slice(0, 66);
    s= '0x' + result.slice(66, 130);
    v= parseInt(result.slice(130, 132), 16);
  
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

    await greeter.connect(spender).transferFrom(
      owner.address, 
      greeter.address, 
      1
    );
    expect(await greeter.balanceOf(greeter.address)).to.be.equal(1);

  });
});
