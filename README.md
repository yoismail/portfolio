# 👋 Yomi Ismail

### Data Engineer | Product Operations Specialist

🚀 I design and build scalable data pipelines, optimize operational workflows, and turn raw data into actionable business insights.

---

## 🌐 Live Portfolio

👉 [Yomi-Ismail-Portfolio](https://yoismail.github.io/portfolio/)

---

## 📌 About This Project

This repository contains my personal portfolio website, built to showcase **real-world, production-oriented work** across Data Engineering and Product Operations.

The goal is not just to display projects, but to demonstrate:

* **System thinking**
* **Data architecture design**
* **Operational impact**
* **Clean, modern user experience**

---

## 🧠 What This Portfolio Demonstrates

This portfolio reflects how I approach problems as a Data Engineer:

* ☁️ Cloud-native serverless ELT pipelines on GCP (Cloud Composer, Dataproc Serverless, GCS, BigQuery)
* 🐳 Containerized on-premise data platforms with Docker Compose and orchestrated execution
* 🔁 Airflow DAGs with parameterized scheduling for stock vs scaled execution
* 🌊 Medallion architecture (Bronze → Silver → Gold) for raw-to-warehouse data flows
* 🔄 End-to-end ETL and ELT pipeline design with idempotent re-runs
* ⚡ Distributed processing with PySpark on millions of rows (broadcast joins, explicit caching, year/month partitioning)
* 🏗️ Three-table dimensional Gold layers and star schema warehouses
* 🔌 Asynchronous, high-concurrency API ingestion with retry and rate-limit discipline
* 📊 Analytics-ready data modeling with composite primary keys, explicit BigQuery schemas, DECIMAL precision, and indexed query paths
* 🔒 Idempotent loads via deterministic surrogate keys, dedup-merge patterns, and row-count validation
* 📈 Translating data into business decisions through warehouse-side feature engineering

---

## 🚀 Featured Work

### 🏢 Nova Retail: Dockerized Data Platform with Airflow-Orchestrated Medallion ETL

A containerized on-premise data platform built for a multinational retail scenario, with parameterized stock-vs-scaled execution from the same DAG:

* Architected a 5-service Docker Compose stack (PostgreSQL, custom Spark image, Airflow init/webserver/scheduler) brought up by one command, with health-checked service dependencies and persistent named volumes
* Built a PySpark medallion pipeline (Bronze partitioned Parquet → Silver joined frame → three-table dimensional Gold) with year/month partitioning on fact tables, explicit broadcast hints on small dimensions, and cache strategy on the join chain
* Implemented Apache Airflow orchestration with `Param`-based DAG supporting both scheduled stock runs (analytical truth) and on-demand scaled runs (architecture validation), using the sidecar Spark pattern via `docker exec`
* Designed a three-table dimensional Gold layer (`fact_sales` at transaction grain, `sales_summary` by state-category, `sales_by_month_state` by year-month) with composite primary keys, DECIMAL precision, and read-optimized indexes
* Validated every PostgreSQL load with read-back row-count comparison; zero silent data loss across all loads
* End-to-end runtime: 3m 11s stock (555K source rows, 118K Silver records, 3 Gold tables); validated at 2x scale processing 7.5M Silver records in 13m 14s

👉 [View project on GitHub](https://github.com/yoismail/nova_retail_case_study)
👉 [Read the full case study](https://yoismail.github.io/portfolio/nova_retail.html)

---

### ⚽ World Football Insights: Cloud-Native Serverless ELT on GCP

A production-shipped cloud-native ELT pipeline built for a global sports analytics scenario, orchestrating async API extraction, PySpark medallion transformations, and BigQuery lakehouse loads on managed Google Cloud infrastructure:

* Designed a 14-task Cloud Composer DAG with fan-out/converge/validate/fan-out shape, processing three entity streams (teams, standings, matches) in parallel where they can be, converging at both Dataproc jobs and the quality gate
* Deployed on real Cloud Composer 2 (service 2.17.7, Airflow 2.11.1) with Dataproc Serverless (runtime 2.1) as the compute layer: zero clusters managed by hand, ephemeral compute spun up per batch
* Extracted from TheSportsDB REST API using asynchronous `aiohttp` with exponential backoff on HTTP 429 rate limits and configurable request delay
* Implemented lakehouse Medallion: Bronze stays as raw NDJSON in GCS (single source of truth), Silver and Gold materialize as BigQuery external tables (no duplicated warehouse storage)
* Declared explicit BigQuery schemas for all 6 tables using `SchemaField` objects converted to dict via `to_api_repr()`, replacing `autodetect=True` for production-grade type control
* Added a Python data quality gate between Silver and Gold: reads each Silver Parquet, checks row counts, verifies required columns, fails DAG loudly before Gold is touched
* Debugged a real Dataproc machine-type provisioning issue (`e4-custom-4-15872` unavailable in `us-central1-a`) with a targeted `execution_config: {}` fix; cut end-to-end runtime from 1h 13m to 11m 53s (84% reduction)
* Traded runtime for correctness on the schema-fields change: final production runtime 24m 53s with explicit schemas vs 11m 53s with `autodetect=True` on my optimized run

👉 [View project on GitHub](https://github.com/yoismail/worldcup_football_elt)
👉 [Read the full case study](https://yoismail.github.io/portfolio/wfi.html)

---

### 🏦 FibbieBanks: 1M-Row PySpark ETL & Star Schema Warehouse

A distributed ETL pipeline processing 1 million synthetic banking transactions through five disciplined stages into a validated PostgreSQL star schema:

* Designed a 5-stage modular pipeline (Extract → Explore → Clean → Transform → Load) in PySpark
* Built a 4-dimension + 1-fact star schema with deterministic SHA-256 surrogate keys
* Engineered type discipline end-to-end: `DecimalType(18,2)` flows from CSV through to `NUMERIC(18,2)` in PostgreSQL
* Made loads idempotent via temp-table + LEFT JOIN merge pattern; re-runs verify zero duplicate rows
* Validated schema at every transformation stage to catch source drift loudly, not silently
* End-to-end runtime: ~25 minutes on first load, ~9 minutes on idempotent re-run

👉 [View project on GitHub](https://github.com/yoismail/fibbie_banks)
👉 [Read the full case study](https://yoismail.github.io/portfolio/fibbiebanks.html)

---

### 🔬 XTD Research Labs: Async Ingestion & PySpark Medallion Pipeline

A three-stage data engineering pipeline built for a UK grid decarbonization research scenario, processing three years of regional carbon intensity data from a live government API:

* Designed asynchronous `aiohttp` ingestion with semaphore-bounded concurrency and exponential-backoff retry, pulling 1,095 days of regional data from the UK Carbon Intensity API in under 12 minutes with zero rate-limit hits
* Built a medallion architecture (Bronze raw JSON → Silver Parquet → Gold CSV) with three distinct idempotency models, one per layer, matched to each layer's rebuild cost
* Used PySpark to explode deeply nested JSON and pivot 9 fuel types into typed columns: 53,594 raw records expand to 8.7M intermediate rows, then collapse to 945,092 silver records
* Aggregated to 19,728 daily research metrics and loaded to PostgreSQL via a two-stage dedup-merge with composite-key idempotency
* Recovered 32 transient HTTP 500 errors via retry logic during the actual run, with zero permanent failures and one empty-payload edge case caught and skipped

👉 [View project on GitHub](https://github.com/yoismail/xtd_research_labs_case_study)
👉 [Read the full case study](https://yoismail.github.io/portfolio/xtd_research_labs.html)

---

### 💳 PayFlow: End-to-End ETL & Data Warehouse

A production-style ETL pipeline built to simulate a fintech transaction system using real Brazilian e-commerce data:

* Designed modular pipeline architecture (extract, stage, transform, load)
* Built normalized staging + analytics-ready star schema in PostgreSQL
* Implemented data cleaning, validation, and transformation logic across 9 source CSVs
* Optimized data loading with idempotent inserts and structured logging

*Note: PayFlow and Nova Retail both use the public Olist Brazilian e-commerce dataset, taken from different engineering angles. PayFlow demonstrates classical normalized warehousing on the dataset; Nova Retail demonstrates production-grade infrastructure (Docker, Airflow, medallion architecture) on the same data.*

👉 [View project on GitHub](https://github.com/yoismail/payflow_case_study)
👉 [Read the full case study](https://yoismail.github.io/portfolio/payflow.html)

---

### 🍫 ChocoDelight: Layered Data Platform

A three-schema PostgreSQL warehouse on chocolate sales data, with raw, operational, and analytics layers and a full dimensional model.

👉 [View project on GitHub](https://github.com/yoismail/choco_delight_data_platform)
👉 [Read the full case study](https://yoismail.github.io/portfolio/chocodelight.html)

---

### 🛒 AliExpress Laptop ETL: Live Web Scraping Pipeline

A production-style scraping pipeline that walks 60 pages of AliExpress laptop listings, enriches with discount metrics and price bands, and appends only new records to PostgreSQL.

👉 [View project on GitHub](https://github.com/yoismail/aliExpress_laptop_ETL_pipeline)
👉 [Read the full case study](https://yoismail.github.io/portfolio/aliexpress.html)

---

## ⚙️ Tech Stack

### Cloud-Native (GCP)

* Google Cloud Composer 2 (managed Apache Airflow)
* Dataproc Serverless (managed PySpark)
* Google Cloud Storage (data lake, Parquet, NDJSON)
* Google BigQuery (external tables, explicit schemas)

### Distributed & Big Data

* PySpark (DataFrames, SQL, JDBC)
* Apache Spark (transformation engine)
* Parquet (columnar storage, partitioned writes)

### Orchestration & Containerization

* Apache Airflow (Param-based DAGs, BashOperator, sidecar Spark pattern, Cloud Composer)
* Docker, Docker Compose (multi-service containerized data platforms)

### Data Engineering

* Python (pandas, SQLAlchemy, psycopg2, python-dotenv)
* Asynchronous Python (aiohttp, asyncio) for high-concurrency ingestion
* PostgreSQL (star schema, dimensional Gold layers, FK referential integrity, composite keys, indexes)
* SQL (DDL, complex joins, window functions, CTEs)
* JDBC (cross-system data movement, parallel-write candidates)
* ETL and ELT Pipelines (modular, idempotent, transactional)
* Dimensional Modeling (Kimball star schema, three-table Gold, conformed dimensions, surrogate keys)
* Medallion Architecture (Bronze, Silver, Gold layered data lakes)
* Lakehouse Medallion (Bronze in object storage, Silver/Gold in warehouse)

### Data Engineering Patterns

* Deterministic SHA-256 surrogate keys
* Idempotent loads via temp-table + LEFT JOIN merge, two-stage dedup-merge, WRITE_TRUNCATE/WRITE_OVERWRITE, and three-layer overwrite semantics
* Layered idempotency (file-existence, tracker-file, partition-overwrite, wipe-and-rebuild)
* Year/month partitioning on fact tables for read pruning
* Broadcast joins on bounded-size dimensions
* Explicit caching strategy on join chains (cache-before-action)
* Row-count validation on every Postgres load (read-back verification)
* Asynchronous ingestion with semaphore-bounded concurrency and backoff retry
* Schema validation at every transformation stage
* Explicit BigQuery `SchemaField` declarations (no `autodetect` in production)
* Type-aware cleaning (DECIMAL preservation for money and metrics)
* Custom observability (timed decorators, structured logs, rotating file handlers, UTF-8 detection)
* Environment-driven configuration with dual-host detection (local vs container)

### Web Scraping & Automation

* Selenium WebDriver
* BeautifulSoup

### Tools & Workflow

* Git & GitHub (GitHub Actions, GitHub Pages, CI/CD)
* Jenkins (build pipelines)
* Tableau, Power BI (analytics dashboards)
* Zoho CRM / Mixpanel (product operations)
* AWS S3 (object storage)
* Grafana (observability dashboards)
* VS Code, PyCharm

### Currently Learning

* Azure Databricks, Azure Data Factory, Azure Synapse, Azure SQL Database (working knowledge)
* dbt (analyst-authored transformations)
* Amazon Redshift, Snowflake
* Apache Kafka (event streaming)
* Terraform (infrastructure-as-code)
* Hadoop (distributed file system)

---

## 🎨 Key Features of the Website

* Responsive and mobile-optimized layout
* Smooth scrolling and interaction design
* Clean, recruiter-focused UI
* Structured project showcase with 7 in-depth case studies (4 featured, 3 secondary)
* 7 engineering principles backed by working code references
* Performance-optimized frontend (no frameworks, pure HTML/CSS/JS)

---

## 📈 What I'm Currently Building

* Spark cluster deployment (Databricks, EMR, Dataproc) for jobs beyond single-host limits
* dbt-layered analytics models on top of warehouse outputs
* SCD Type 2 patterns for slowly changing dimensions
* Parallel JDBC writes for high-throughput warehouse loads
* Migration tooling (Alembic, Flyway) for safe DDL evolution
* Pytest coverage across the featured projects (starting with FibbieBanks)

---

## 🤝 Connect With Me

* 💼 GitHub: https://github.com/yoismail
* 🌐 Portfolio: https://yoismail.github.io/portfolio/
* 📧 Email: [ismailyomi@gmail.com](mailto:ismailyomi@gmail.com)
* 🔗 LinkedIn: https://www.linkedin.com/in/yomi-ismail

---

## 🧠 Philosophy

> "Data is only valuable when it is structured, reliable, and actionable."

The seven engineering principles that guide my work:

1. Schema is the source of truth, not Python
2. Idempotency is a contract, not a feature
3. Write logs assuming you'll be debugging at 2am
4. Validate before you load, not after
5. Configuration belongs in environment variables, not code
6. Modular ETL beats monolithic scripts, always
7. Engineer features in the warehouse, not in dashboards

👉 [Read the full Engineering Principles page](https://yoismail.github.io/portfolio/principles.html)

---

## ⭐ Final Note

This portfolio is continuously evolving as I build **real-world, production-grade data engineering solutions**.

If you're hiring for Data Engineering, Analytics, or Technical Operations roles, this repository reflects the level of thinking and execution I bring.
