FULL STACK AND BLOCKCHAIN APPLICATION DEVELOPMENT

A PROJECT REPORT


Submitted by


Guru Wangchuk (23BCA10667)

in partial fulfillment for the award of the degree of


BACHELOR OF COMPUTER APPLICATION



 

Chandigarh University
April 2026
 
 

BONAFIDE CERTIFICATE

Certified that this project report “FULL STACK AND BLOCKCHAIN APPLICATION DEVELOPMENT” is the bonafide work of “GURU WANGCHUK” who carried out the project work under my/our supervision.





 
<<Signature of the HoD>>
SIGNATURE

<<Name of the Head of the Department>>

HEAD OF THE DEPARTMENT

Department of Computer Applications
 
<<Signature of the Supervisor>>
SIGNATURE

<<Name>>

SUPERVISOR
Assistant Professor
Department of Computer Applications
 


Submitted for the project viva-voce examination held on 

INTERNAL EXAMINER	EXTERNAL EXAMINER 
TABLE OF CONTENTS

List of Figures	6
List of Tables	7
List of Standards	8
CHAPTER 1.	INTRODUCTION	10
1.1.	Identification of Client/ Need/ Relevant Contemporary issue	 10
1.2.	Identification of Problem	10
1.3.	Identification of Tasks	10
1.4.	Timeline	10
1.5.	Organization of the Report	10
CHAPTER 2.	LITERATURE REVIEW/BACKGROUND STUDY	11
2.1.	Timeline of the reported problem	11
2.2.	Existing solutions	11
2.3.	Bibliometric analysis	11
2.4.	Review Summary	11
2.5.	Problem Definition	11
2.6.	Goals/Objectives	11
CHAPTER 3.	DESIGN FLOW/PROCESS	12
3.1.	Evaluation & Selection of Specifications/Features	12
3.2.	Design Constraints	12
3.3.	Analysis of Features and finalization subject to constraints	12
3.4.	Design Flow	12
3.5.	Design selection	12
3.6.	Implementation plan/methodology	12
CHAPTER 4.	RESULTS ANALYSIS AND VALIDATION	13
4.1.	Implementation of solution	13
CHAPTER 5.	CONCLUSION AND FUTURE WORK	14
5.1.	Conclusion	14
5.2.	Future work	14
REFERENCES	15
APPENDIX	16
1.	Plagiarism Report	16
2.	Design Checklist	16
USER MANUAL	17


 
List of Figures
Figure 3.1: High-Level System Architecture Diagram	12
Figure 3.2: Database Relation Diagram (ER Diagram)	12
Figure 4.1: Marketplace Interface with Project Listings	13
Figure 4.2: Carbon Credit Retirement Dashboard	13
Figure 4.3: Generated Impact Certificate UI	13
 
List of Tables
Table 3.1: Technical Stack and Component Descriptions	12
Table 3.2: User Roles and Permission Matrix	12
Table 4.1: Functional Testing Results and Validation Table	13
 
List of Standards (Mandatory For Engineering Programs)
Standard	Publishing Agency	About the standard	Page no
ISO/IEC 25010
	International Organization for Standardization	
Defines software quality characteristics such as usability, performance efficiency, reliability, and security used to evaluate the developed web platform.	12

ISO/IEC 27001	International Organization for Standardization	Provides guidelines for information security management systems, ensuring secure handling of user data and authentication mechanisms.                      	
13
ISO/IEC 12207	International Organization for Standardization	Describes the software development lifecycle including planning, development, testing, and maintenance phases followed in the project	
10
ISO 9241	International Organization for Standardization	Focuses on usability and user interface design principles applied in creating a responsive and user-friendly website.	12
IEEE 829	Institute of Electrical and Electronics Engineers	Defines standard formats for software testing and validation documentation used during project testing phase.	13


ABSTRACT
The Himalaya Carbon Exchange is a comprehensive full-stack and blockchain-based platform designed to facilitate the tokenization, tracking, and trading of sovereign carbon credits. As global climate action moves toward Article 6.2 of the Paris Agreement, there is an urgent need for transparent infrastructures that prevent double-counting and ensure environmental integrity. This project implements a decentralized registry using Ethereum-compatible smart contracts (ERC1155) and a modern web interface built with Next.js and Tailwind CSS. The system integrates a relational layer via Prisma to provide high-performance data querying for institutional buyers (Traders) and regulatory bodies (Operators). Key features include real-time registry synchronization, mock CAD Trust integration for global transparency, and a secure retirement workflow that generates immutable impact certificates. The results demonstrate how blockchain technology can anchor trust in national carbon monitoring and reporting systems (MRV), providing a scalable model for regional carbon markets in the Himalayan region.

---------------------------- New Page -------------------------
GRAPHICAL ABSTRACT
[A workflow diagram showing the Lifecycle of a Carbon Credit: 
1. Project Registration (Sovereign Authority) 
2. Token Minting (Blockchain Layer) 
3. Marketplace Listing (Trader Interaction) 
4. Asset Acquisition (Transaction) 
5. Credit Retirement (Impact Realization) 
6. Certificate Issuance (Final Proof)]

---------------------------- New Page -------------------------
ABBREVIATIONS 
- BCA: Bachelor of Computer Applications
- ERC: Ethereum Request for Comments
- EVM: Ethereum Virtual Machine
- MRV: Monitoring, Reporting, and Verification
- ITMO: Internationally Transferred Mitigation Outcomes
- CAD Trust: Climate Action Data Trust
- ORM: Object-Relational Mapping
- UI/UX: User Interface/User Experience
- RFQ: Request for Quote
- API: Application Programming Interface

---------------------------- New Page -------------------------
SYMBOLS
- Ξ : Ethereum (ETH) symbol
- tCO2e : Tonnes of Carbon-Dioxide Equivalent
- 🔒 : Secure Layer / Encryption
- ⛏️ : Transaction Minting / Processing
- 📄 : Documentation / Metadata File
- 🔗 : Blockchain Link / Transaction Hash

---------------------------- New Page -------------------------
 
CHAPTER 1.	
INTRODUCTION
1.1.	Identification of Client /Need / Relevant Contemporary issue
The global carbon market is currently at a critical junction defined by the transition from voluntary markets to compliance-driven sovereign exchanges under Article 6.2 of the Paris Agreement. According to World Bank reports, the lack of transparency and the risk of double-counting—where the same emission reduction is claimed by multiple parties—remain the primary barriers to institutional trust. The "Client" in this context is represented by national climate ministries (specifically in the Himalayan region) and institutional investors who require a "Single Source of Truth" for carbon assets. The need for this project is justified by the increasing shift towards decentralized registries that can interoperate with global metadata systems like the CAD Trust.

1.2.	Identification of Problem
The current carbon trading landscape suffers from fragmented registries, slow settlement times, and opaque retirement processes. Specifically, there is no unified digital infrastructure that allows sovereign entities to issue serialized, Article 6-authorized carbon units while maintaining a high-performance, user-friendly marketplace for global buyers. This leads to information asymmetry and potential fraud in "green" claims.

1.3.	Identification of Tasks
To resolve these issues, the project is structured into three primary domains of task identification:
- **Core Blockchain Logic**: Developing an ERC1155-based registry contract to handle unit batches, authorizations, and retirements.
- **Full-Stack Development**: Building a responsive Next.js frontend and a Prisma-backed API to manage user portfolios and market data.
- **Integration & Security**: Implementing mock synchronization with global meta-registries and securing the issuance flow via administrative role-based access.
The report is organized into chapters covering literature study (Chapter 2), detailed design and methodology (Chapter 3), implementation and result analysis (Chapter 4), and final conclusions (Chapter 5).

1.4.	Timeline
The project was executed over a 16-week period:
- Weeks 1-2: Requirement gathering, feasibility study, and literature review.
- Weeks 3-4: UI/UX prototyping and database schema design.
- Weeks 5-9: Backend API development and Blockchain Smart Contract coding.
- Weeks 10-13: Frontend integration, dashboard development, and state management.
- Weeks 14-15: Testing, debugging, and validation.
- Week 16: Final documentation and reporting.

1.5.	Organization of the Report
- Chapter 1 (Introduction): Provides the context, problem statement, and general project framework.
- Chapter 2 (Literature Review): Analyzes existing solutions and provides a bibliometric study of blockchain in climate tech.
- Chapter 3 (Design Flow): details the architectural choices, tech stack, and implementation methodology.
- Chapter 4 (Results): Showcases the functional outcome of the project through UI walkthroughs and logs.
- Chapter 5 (Conclusion): Summarizes the findings and suggests future enhancements.

 
CHAPTER 2.	
LITERATURE REVIEW/BACKGROUND STUDY
2.1.	Timeline of the reported problem 
The concept of carbon trading was popularized by the Kyoto Protocol in 1997, but digital fraud and "zombie credits" became a global documentary concern in the mid-2010s. Major incidents of "double-counting" were reported by the Financial Times and climate watchdog agencies in 2021, leading to the COP26 Glasgow focus on Article 6, which finally provided the legal framework for sovereign carbon exchanges.

2.2.	Existing solutions
Current solutions include Verra (VCS) and the Gold Standard, which are centralized databases with high entry barriers. Other blockchain-native solutions like Toucan Protocol or Moss.Earth focus on tokenizing voluntary credits but often lack the "Article 6" sovereign authorization hooks required for national-level compliance.

2.3.	Bibliometric analysis
Key features of existing systems analysis:
- **Centralized Registries**: Highly effective for verification but slow and opaque (Drawback: High transaction fees and lack of real-time transparency).
- **Blockchain Bridges**: Good for liquidity but often disconnected from legal registries (Drawback: Risk of tokenizing unverified assets).
- **Proposed Himalaya Carbon Exchange**: Optimized for Sovereign-to-Institutional (S2I) trades with native Article 6 metadata and high-fidelity UI.

2.4.	Review Summary
The literature confirms that while carbon markets are growing, they are plagued by infrastructure gaps. The project addresses this by bridging the gap between high-speed web application performance and the immutable security of blockchain-based registries.

2.5.	Problem Definition
The core problem is to build a full-stack platform that can:
1. Tokenize sovereign carbon credits with Article 6 metadata.
2. Provide a marketplace for institutional acquisition.
3. Securely retire credits and issue cryptographic proofs of impact.
It will NOT handle real-world fiat currency clearing or physical legal enforcement in this prototype phase.

2.6.	Goals/Objectives
- To design a secure ERC1155 registry for carbon unit serialization.
- To implement a high-performance dashboard using Next.js for portfolio tracking.
- To achieve real-time synchronization between the database and the blockchain state.
- To generate unique, cryptographically-linked impact certificates upon credit retirement.

 
CHAPTER 3.	
DESIGN FLOW/PROCESS
3.1.	Evaluation & Selection of Specifications/Features 
After evaluating existing systems, the following features were selected for the Himalaya Carbon Exchange:
- **Registry Dashboard**: Real-time sync status and statistical overview.
- **Dynamic Marketplace**: Catalog of verified projects with Article 6 authorization badges.
- **Smart Retirement**: A guided workflow to burn units and receive certificates.
- **CAD Trust Harmony**: Simulated log feed to show interoperability with global standards.

3.2.	Design Constraints
1.1.1. Standards:
- **ISO/IEC 25010**: Applied for maintaining modularity and maintainability of the codebase.
- **Economic/Cost**: Use of L2 Polygon Amoy testnet to minimize development gas costs.
- **Ethical/Environmental**: Ensuring that the system itself does not consume excessive energy (PoS blockchain).
- **Social**: Creating a localized registry specifically tailored for the Himalayan carbon sequestration potential.

3.3.	Analysis of Features and finalization subject to constraints
Features were finalized to prioritize "Registry-to-Trader" workflows. For instance, real-time fiat payment was replaced with "Simulated Acquisition" to focus on the data integrity and blockchain state management of the unit's lifecycle.

3.4.	Design Flow 
- **Alternative 1 (Pure On-Chain)**: All metadata stored on-chain. *Cons*: Very expensive and slow for UI rendering.
- **Alternative 2 (Hybrid Architecture)**: Metadata in PostgreSQL (Prisma) and ownership logic on Polygon. *Pros*: Provides sub-second UI updates while maintaining the blockchain as the final authority.

3.5.	Design selection 
The Hybrid Architecture (Alternative 2) was selected. It allows for a premium, fast user experience (Next.js server actions) while using Smart Contracts for the canonical state of unit issuance and retirement.

3.6.	Implementation plan/methodology
The implementation followed an Agile methodology:
1. **Database Schema**: Modeling Projects, UserBalances, and Certificates in Prisma.
2. **Smart Contracts**: Writing the `HimalayaCarbonRegistry.sol` using OpenZeppelin standards.
3. **Frontend components**: Developing modular UI components (BentoGrid, MarketCards) using Framer Motion.
4. **Integration**: Linking Server Actions to both Prisma and the Blockchain provider (viem/wagmi).

 
CHAPTER 4.	
RESULTS ANALYSIS AND VALIDATION
4.1.	Implementation of solution 
The platform was successfully implemented using modern industry-standard tools:
- **Analysis**: Used Prisma Studio for data validation and Etherscan/Polygonscan for on-chain verification.
- **Design Drawings**: Component-based architecture documented via TypeScript interfaces.
- **Project Management**: Managed via a structured development workflow on GitHub.
- **Testing**: Validated through mock user journeys where a trader buys a "Wangdue Hydropower" credit and retires it for a "Corporate CSR" impact certificate.
- **Validation**: The system successfully prevents a user from retiring more credits than they own using database constraints and server-side validation logic.

 
CHAPTER 5.	
CONCLUSION AND FUTURE WORK
5.1.	Conclusion 
The project successfully demonstrates the feasibility of a full-stack blockchain solution for carbon markets. The expected outcome of a "High-Trust Exchange" was achieved through the implementation of a transparent registry and immutable certificate generation. The system effectively bridges the gap between complex blockchain protocols and intuitive user interfaces. Minor deviations included the simulation of the CAD Trust API due to access limitations, which was addressed using a specialized log-simulation agent.

5.2.	Future work
Future enhancements will focus on:
- **Real Fiat Integration**: Connecting Stripe or banking APIs for actual currency clearing.
- **MRV Integration**: Linking satellite and IoT data directly to the project registration flow for automated credit issuance.
- **Mainnet Migration**: Deploying to a production-ready L2 environment with formal security audits.
- **Advanced Analytics**: Implementing AI-driven pricing models based on global carbon market trends.

 
REFERENCES
1. Paris Agreement, Article 6.2 Implementation Guidelines (UNFCCC).
2. World Bank, "State and Trends of Carbon Pricing 2024."
3. OpenZeppelin, "ERC1155 Multi-Token Standard Documentation."
4. Next.js Documentation, "Server Actions and Data Fetching Patterns."
5. CAD Trust, "Global Carbon Registry Interoperability Standards."

 
APPENDIX
1.	Plagiarism Report
[The project has been cross-checked through standard institutional plagiarism software showing less than 10% similarity, ensuring the technical logic and documentation are original work.]

2.	Design Checklist
- [x] Smart Contract Deployment Verified
- [x] Database Schema Synchronized
- [x] Mobile-Responsive UI Validated
- [x] Role-Based Access Control Implemented
- [x] Impact Certificate Generation Functional

 
USER MANUAL
**Step 1: Set Up Locally**
Clone the repository and install dependencies using `npm install`. Configure the `.env` file with your local RPC and database URL.

**Step 2: Access the Dashboard**
Run `npm run dev` and navigate to `http://localhost:3000`. You will see the Registry Overview showing the current sync status.

**Step 3: Browse the Marketplace**
Navigate to the "Marketplace" tab. Browse through the Article 6.2 authorized projects. Click "Acquire" on a project to add units to your portfolio.

**Step 4: Retire Credits**
Go to the "Retire" page. Select the credit from your portfolio, enter the beneficiary details, and click "Submit Retirement".

**Step 5: Download Certificate**
Upon successful retirement, the system will display a digital Impact Certificate. Note the unique Transaction Hash and CAD Sync ID for your compliance records.
