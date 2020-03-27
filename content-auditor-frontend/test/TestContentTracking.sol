pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ContentTracking.sol";


//Some Dummy tests
contract TestContentTracking {

  function testContainsBlockchainData() public {
    ContentTracking contentTracking = ContentTracking(DeployedAddresses.ContentTracking());

    contentTracking.storeDocument("test");

    bool expected = true;
    Assert.equal(contentTracking.newDocument("test"), expected, "It should store the test value on the Blockchain.");
  }
  function testIntegerData() public {
    ContentTracking contentTracking = ContentTracking(DeployedAddresses.ContentTracking());

    contentTracking.storeDocument("1234");

    bool expected = true;
    Assert.equal(contentTracking.newDocument("test"), expected, "It should store the test value on the Blockchain.");
  }
  function testSymbolData() public {
    ContentTracking contentTracking = ContentTracking(DeployedAddresses.ContentTracking());

    contentTracking.storeDocument("(*#@!");

    bool expected = true;
    Assert.equal(contentTracking.newDocument("test"), expected, "It should store the test value on the Blockchain.");
  }

  function testDoesNotContainBlockchainData() public {
    ContentTracking contentTracking = ContentTracking(DeployedAddresses.ContentTracking());

    bool expected = false;

    Assert.equal(contentTracking.newDocument("testXXXX"), expected, "It should store the test value on the Blockchain.");
  }

  function testReturnsHash() public {
    ContentTracking contentTracking = ContentTracking(DeployedAddresses.ContentTracking());

    bytes32 expected = 0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08;

    Assert.equal(contentTracking.returnHashedDocument("test"), expected, "It should return the hash test value.");
  }
}