// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2;

import "./ERC1155/ERC1155.sol";
import "./ERC1155/IERC1155MetadataURI.sol";
import "./ERC1155/Ownable.sol";

contract NFTEvolve is ERC1155, IERC1155MetadataURI, Ownable {

    mapping(uint256 => string[]) private metadatas;
    mapping(uint256 => mapping(address => uint256)) private metadataIndex;
    uint256 public id;

    event NFTEvolved(address _nftCollection, address _nftOwner, uint256 _id, uint256 _toIndex);
    event NFTPayToEvolve(address _nftCollection, address _nftOwner, uint256 _id, uint256 _toIndex, uint256 _price);

    constructor(string memory _uri) ERC1155(_uri) {
    }

    function mint(uint256 _amount, string[] memory _metadatas) external {
        id++;
        _mint(msg.sender, id, _amount, "");
        metadatas[id] = _metadatas;
    }

    function uri(uint256 _id) public view virtual override returns (string memory) {
        return metadatas[_id][metadataIndex[_id][msg.sender]];
    }

    function evolveNFT(bytes memory _params, bytes memory _messageLength, bytes memory _signature) external {
        address _signer = _decodeSignature(_params, _messageLength, _signature);
        require(_signer == owner(), "BadSigner");

        (address _nftCollection, uint256 _id, address _nftOwner, uint256 _toIndex) = abi.decode(_params, (address, uint256, address, uint256));
        require(_nftCollection == address(this), "BadContract");
        require(_toIndex > metadataIndex[_id][_nftOwner], "DowngradeNotAllowed");
        metadataIndex[_id][_nftOwner] = _toIndex;
        
        emit NFTEvolved(_nftCollection, _nftOwner, _id, _toIndex);
    }

    function payToEvolve(bytes memory _params, bytes memory _messageLength, bytes memory _signature) external payable {
        address _signer = _decodeSignature(_params, _messageLength, _signature);
        require(_signer == owner(), "BadSigner");

        (address _nftCollection, uint256 _id, address _nftOwner, uint256 _toIndex, uint256 _price) = abi.decode(_params, (address, uint256, address, uint256, uint256));
        require(_nftOwner == msg.sender, "BadSender");
        require(_price == msg.value, "BadPrice");
        require(_nftCollection == address(this), "BadContract");
        require(_toIndex > metadataIndex[_id][_nftOwner], "DowngradeNotAllowed");
        metadataIndex[_id][_nftOwner] = _toIndex;
        
        emit NFTPayToEvolve(_nftCollection, _nftOwner, _id, _toIndex, _price);
    }

    function _decodeSignature(bytes memory _message, bytes memory _messageLength, bytes memory _signature) internal pure returns (address) {
        bytes32 messageHash = keccak256(abi.encodePacked(hex"19457468657265756d205369676e6564204d6573736167653a0a", _messageLength, _message));
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(_signature, 0x20))
            s := mload(add(_signature, 0x40))
            v := byte(0, mload(add(_signature, 0x60)))
        }
        
        return ecrecover(messageHash, v, r, s);
    }
}