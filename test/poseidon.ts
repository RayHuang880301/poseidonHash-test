import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";
import { PoseidonHash } from "../typechain-types";
const circomlibjs = require("circomlibjs");
const { createCode, generateABI } = circomlibjs.poseidonContract;

describe("Poseidon hash", function () {
  let poseidonHash: PoseidonHash;
  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    // deploy poseidonUnit2
    const PoseidonUnit2Factory = new ethers.ContractFactory(
      generateABI(2),
      createCode(2),
      deployer
    );
    const poseidonUnit2 = await PoseidonUnit2Factory.deploy();
    await poseidonUnit2.deployed();

    // deploy poseidonT3
    const PoseidonT3Factory = await ethers.getContractFactory("PoseidonT3");
    const poseidonT3 = await PoseidonT3Factory.deploy();
    await poseidonT3.deployed();

    const PoseidonHash = await ethers.getContractFactory("PoseidonHash");
    poseidonHash = await PoseidonHash.deploy(
      poseidonUnit2.address,
      poseidonT3.address
    );
    await poseidonHash.deployed();
  });
  it("gas used test ", async () => {
    // test
    const randX = getRandomUint256();
    const randY = getRandomUint256();
    const unit2Hash = await poseidonHash.unit2Hash([randX, randY]);
    const t3Hash = await poseidonHash.t3Hash([randX, randY]);
    console.log({
      unit2HashGasUsed: (await unit2Hash.wait()).cumulativeGasUsed.toNumber(),
      t3HashGasUsed: (await t3Hash.wait()).cumulativeGasUsed.toNumber(),
    });
  });
});

function getRandomUint256() {
  const amount = utils.randomBytes(32);
  return BigNumber.from(amount);
}
