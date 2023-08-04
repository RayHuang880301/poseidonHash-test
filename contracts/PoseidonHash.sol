/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IPoseidonUnit2} from "./interfaces/IPoseidonUnit2.sol";
import {IPoseidonT3} from "./interfaces/IPoseidonT3.sol";

contract PoseidonHash {
    IPoseidonUnit2 private _poseidonUnit2;
    IPoseidonT3 private _poseidonT3;

    constructor(address poseidonUnit2, address poseidonT3) {
        _poseidonUnit2 = IPoseidonUnit2(poseidonUnit2);
        _poseidonT3 = IPoseidonT3(poseidonT3);
    }

    function unit2Hash(uint256[2] memory input) external returns (uint256) {
        return _poseidonUnit2.poseidon(input);
    }

    function t3Hash(uint256[2] memory input) external returns (uint256) {
        return _poseidonT3.hash(input);
    }
}
