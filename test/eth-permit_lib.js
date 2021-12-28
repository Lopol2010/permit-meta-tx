const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");
const { signERC2612Permit } = require("eth-permit");
const getTypedData = require("./util");

// NOTE: the base contract and derived should have the same name
// because eth-permit lib is taking the name of derived contract, but we need ERC20Permit's name!

describe("Greeter", function () {
  it("Define generals", async function () {
    [owner, spender, caller] = await hre.ethers.getSigners();
    provider = ethers.provider

    value = 1;
  })
  it("Deploy", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();
  });
  it("Create meta tx", async function () {

    result = await signERC2612Permit(
      provider,
      greeter.address,
      owner.address,
      spender.address,
      value
    );

  });
  it("Permit", async function () {
    const {v, r, s, deadline} = result;
  
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
