import {ethers} from "ethers"

const providerArb = new ethers.providers.StaticJsonRpcProvider(
    "https://arbitrum-one.publicnode.com", 
    {
      chainId: 42161,
      name: "Arbitrum",
    }
  );

  let jarABI = [
    "event FermentedJarsFound(uint8 bundleId, uint256[] honeyJarIds)",
    ]

//starts at the block where the first jar fermented
async function getFermentedJarsID() {
    let jars = new ethers.Contract("0x37aa84e2b62a18894610227acb4d3c77346d9c27", jarABI, providerArb)

    let currentBlock = await providerArb.getBlockNumber()
    let events = await jars.queryFilter('FermentedJarsFound', 103248314, currentBlock);
    for (let index = 0; index < events.length; index++) {
        let id = events[index].args.honeyJarIds
        console.log("Fermented jar "+index +" : " +Number(id))
    }
}

getFermentedJarsID()