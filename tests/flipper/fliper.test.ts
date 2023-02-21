import { Flipper } from '@/typings/Flipper';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractType } from 'devphase';


describe('Flipper', () => {
    let factory : Flipper.Factory;
    let contract : Flipper.Contract;
    let signer : KeyringPair;
    let certificate : PhalaSdk.CertificateData;
    
    before(async function() {
        factory = await this.devPhase.getFactory(
            './contracts/flipper/target/ink/flipper.contract',
            {
                contractType: ContractType.InkCode,
            }
        );
        
        await factory.deploy();
        
        signer = this.devPhase.accounts.bob;
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });
    
    describe('default constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(certificate, {});
            expect(response.output.toJSON()).to.be.equal(false);
        });
    });
    
    describe('new constructor', () => {
        before(async function() {
            contract = await factory.instantiate('new', [ true ]);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(certificate, {});
            expect(response.output.toJSON()).to.be.equal(true);
        });
    });
    
});
