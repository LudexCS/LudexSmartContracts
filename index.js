const LudexContractABI = {
    ERC2771Forwarder: require("./build/contracts/ERC2771Forwarder.json"),
    Store: require("./build/contracts/Store.json"),
    PriceTable: require("./build/contracts/PriceTable.json"),
    Ledger: require("./build/contracts/Ledger.json"),
    SellerRegistry: require("./build/contracts/SellerRegistry.json"),
    ItemRegistry: require("./build/contracts/ItemRegistry.json")
}

module.exports = { LudexContractABI };