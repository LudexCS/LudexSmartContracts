import { ethers } from "ethers";
export declare class DeployCommand {
    private readonly wallet;
    private readonly networkName;
    constructor(wallet: ethers.Signer, networkName?: string);
    execute(accounts: string[], initialFeeRate?: number, includeMockUSDC?: boolean): Promise<Map<string, {
        address: string;
        abi: any;
        timestamp: string;
    }>>;
}
//# sourceMappingURL=deploy-command.d.ts.map