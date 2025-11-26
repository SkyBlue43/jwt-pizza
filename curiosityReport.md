# Curiosity Report: _Knowing What to Choose in QA and DevOps_

## Introduction

Ever since the beginning of my time as a CS major, I have always wondered how developers choose what tools to use. During some of my recent classes, I have been able to get some exposure to a few tools, such as AWS, but most of the tools that are out there have remained mostly untouched for me. In an effort to become a better DevOps engineer, and because I am genuinely curious, I am dedicating this report to exploring a lot of the tools and options that are out there so that I can be better prepared for the future.

---

## 1. Where to Run Things (Cloud Platforms)

### AWS

_​​Cost_

- Uses a pay-as-you-go model, allowing users to manage finances based on actual usage.
- Costs vary heavily depending on which services are used.
- Generally low cost for smaller workloads due to scalable architecture.
- Often the highest-priced option overall, but also the most flexible.

_Ecosystem / Tools Available_

- The most mature and extensive cloud ecosystem.
- Ideal for projects where all services can remain within AWS.
- Supports a wide range of modern workloads.
- AWS services integrate well with each other.
- Particularly strong for serverless, containers, and cloud-native tools.

_Team Experience & Familiarity_

- Many developers already have AWS experience.
- Strong community support and extensive documentation.
- Easy to stay within a single unified cloud environment.

_Regional Availability_

- The largest global footprint of any cloud provider.
- Best for applications requiring global performance and redundancy.

_Security & Compliance_

- Extremely mature IAM model.
- Strong security posture due to heavy investment.
- Offers isolated regions for government and regulated workloads.

---

### Azure

_Cost_

- Also uses a pay-as-you-go model.
- Cheapest option for Windows Server and SQL Server workloads.
- Costs are lower for organizations already using Microsoft licensing.

_Ecosystem / Tools Available_

- Best enterprise integration, especially with Microsoft products.
- Strong DevOps ecosystem (e.g., GitHub Actions).
- Ideal for .NET, Windows-based workloads, and Active Directory integration.

_Team Experience & Familiarity_

- Familiar to teams with enterprise IT backgrounds.

_Regional Availability_

- Very global coverage.
- Particularly strong in government regions and in Europe.

_Security & Compliance_

- Strongest identity ecosystem through Entra ID.
- Excellent compliance for government and regulated industries.
- Well-aligned for organizations already using Microsoft security stacks.

---

### Google Cloud

_Cost_

- Very competitive pricing.
- Offers sustained-use discounts automatically.
- Typically the cheapest for compute-heavy workloads, AI/ML jobs, and Kubernetes-based infrastructure.

_Ecosystem / Tools Available_

- Very clean developer experience and UI.
- Innovator of Kubernetes (via Google Kubernetes Engine).
- Strongest ML/AI ecosystem.
- Smaller overall ecosystem but highly specialized.

_Team Experience & Familiarity_

- Common choice for startups and developers seeking simplicity.
- Strong match for teams experienced in Linux, Kubernetes, and data engineering.

_Regional Availability_

- Smallest global footprint but rapidly expanding.
- Very strong performance in regions where it is available.

_Security & Compliance_

- Simple but strong security model.
- Industry-leading encryption and data-protection defaults.

---

### Cloud Provider Comparison Table

| Category              | AWS                                 | Azure                                       | Google Cloud                                  |
| --------------------- | ----------------------------------- | ------------------------------------------- | --------------------------------------------- |
| Cost                  | Highest overall but highly flexible | Best for Microsoft-licensed environments    | Most competitive for compute and AI workloads |
| Ecosystem Size        | Largest and most mature             | Strong enterprise and Microsoft integration | Smaller but highly specialized                |
| Team Familiarity      | Most widely known                   | Common in enterprise IT                     | Common in startups and data-focused teams     |
| Regional Availability | Largest global presence             | Very global, strong in government regions   | Smallest but growing quickly                  |
| Security & Compliance | Extremely mature IAM model          | Strongest identity ecosystem (Entra ID)     | Strong encryption and secure-by-default tools |

---

## 2. How to Run Things (Servers)

### Virtual Machines

_Description_

A virtual machine is a full computer system running in the cloud. You have a complete operating system running on virtualized hardware.

_Cost_

- Must pay for the instance 24/7, regardless of usage.
- Additional cost for OS licensing.
- Scaling requires adding and managing new machines manually.
- You must patch and maintain the operating system.

_Benefits_

- Full control over the operating system and environment.
- Can run almost anything.
- Best for long-running, steady workloads.

_Examples_

- AWS EC2
- Azure Virtual Machines
- Google Compute Engine

---

### Containers

_Description_

A container is a lightweight package of an application and its dependencies. It runs on a shared host OS but is isolated from other workloads.

_Cost_

- Cheaper than VMs because containers share the host machine.
- Additional efficiency options (like Kubernetes) add cost.
- More complex to manage than VMs due to container orchestration.
- Kubernetes adds significant operational overhead.

_Benefits_

- Fast startup and efficient scaling.
- Highly portable across environments.
- Easier deployment than VMs.

_Examples_

- Docker containers on AWS ECS or Fargate
- Azure Kubernetes Service
- Google Kubernetes Engine

---

### Serverless

_Description_

Serverless computing runs your code only when needed. The cloud provider manages servers, containers, and scaling. You deploy functions, not servers.

_Cost_

- Pay only for actual execution time.
- Can become expensive under heavy traffic, but scales efficiently.
- Harder to debug because functions are short-lived.
- Cold starts can affect latency.

_Benefits_

- No server management.
- Automatic scaling.
- Fast deployment and low maintenance.

_Examples_

- AWS Lambda
- Azure Functions
- Google Cloud Functions

---

### PaaS Platforms

_Description_

A fully managed platform that lets users deploy applications without managing underlying infrastructure.

_Cost_

- Priced in tiers with predictable costs.
- Usually more expensive than containers but cheaper than VMs.
- Additional features add cost.
- Less control over the environment.
- Not ideal for unusual or custom software.

_Benefits_

- Very easy to deploy and manage applications.
- Built-in scaling, domains, and environment setup.

_Examples_

- AWS Elastic Beanstalk
- Azure App Service
- Google App Engine

---

### Compute Model Comparison Table

| Compute Model    | Control Level | Cost Profile                | Best Use Cases                                 | Downsides                                   |
| ---------------- | ------------- | --------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Virtual Machines | Highest       | Pay 24/7; more expensive    | Legacy apps, custom OS needs, steady workloads | High maintenance, slow scaling              |
| Containers       | Medium        | Efficient; shared resources | Microservices, CI/CD, modern apps              | Requires orchestration and DevOps expertise |
| Serverless       | Lowest        | Pay only when code runs     | Event-driven apps, APIs, low-maintenance apps  | Cold starts, limited runtime control        |
| PaaS             | Low–Medium    | Predictable tiered pricing  | Web apps, APIs, rapid development              | Limited customization                       |

---

## 3. Where to Store Things (Databases)

| Feature            | SQL Database                                | Non-SQL Database                                   |
| ------------------ | ------------------------------------------- | -------------------------------------------------- |
| **Data Model**     | Structured tables with rows and columns     | Flexible data models                               |
| **Schema**         | Fixed schema defined in advance             | Schema-less or flexible                            |
| **Scaling**        | Vertical scaling (bigger servers)           | Horizontal scaling (more servers)                  |
| **Query Language** | SQL                                         | No standard language (varies by database)          |
| **Best For**       | Relational and complex queries              | Large-scale, flexible, or rapidly changing data    |
| **Performance**    | Great for structured, predictable workloads | Great for large write volumes and distributed data |
| **Examples**       | MySQL, PostgreSQL, SQL Server, Oracle       | MongoDB, DynamoDB, Cassandra, Redis                |
| **Use Cases**      | Banking, inventory, user accounts           | Real-time apps, analytics, caching, social feeds   |

---

## Conclusion

After doing a deeper dive into some of the different tools available, I feel much less confused. Choices made in my classes make more sense, and I finally understand why certain tools were used in specific cases. I also see how my coursework has already exposed me to many important DevOps technologies. I am excited to continue working in DevOps and look forward to applying this knowledge in the future.
