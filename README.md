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

* 🔄 End-to-end ETL pipeline design (Extract → Transform → Load)
* 🏗️ Scalable data architecture and schema optimization
* 📊 Analytics-ready data modeling (fact & dimension tables)
* ⚙️ Distributed processing with PySpark on 1M+ row datasets
* 🔁 Idempotent re-runs and deterministic surrogate keys
* 📈 Translating data into business decisions

---

## 🚀 Featured Work

### 🏦 FibbieBanks — 1M-Row PySpark ETL & Star Schema Warehouse

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

### 💳 PayFlow — End-to-End ETL & Data Warehouse

A production-style ETL pipeline built to simulate a fintech transaction system using real Brazilian e-commerce data:

* Designed modular pipeline architecture (extract, stage, transform, load)
* Built normalized staging + analytics-ready star schema in PostgreSQL
* Implemented data cleaning, validation, and transformation logic across 9 source CSVs
* Optimized data loading with idempotent inserts and structured logging

👉 [View project on GitHub](https://github.com/yoismail/payflow_case_study)
👉 [Read the full case study](https://yoismail.github.io/portfolio/payflow.html)

---

### 🍫 ChocoDelight — Layered Data Platform

A three-schema PostgreSQL warehouse on chocolate sales data, with raw, operational, and analytics layers and a full dimensional model.

👉 [View project on GitHub](https://github.com/yoismail/choco_delight_data_platform)
👉 [Read the full case study](https://yoismail.github.io/portfolio/chocodelight.html)

---

### 🛒 AliExpress Laptop ETL — Live Web Scraping Pipeline

A production-style scraping pipeline that walks 60 pages of AliExpress laptop listings, enriches with discount metrics and price bands, and appends only new records to PostgreSQL.

👉 [View project on GitHub](https://github.com/yoismail/aliExpress_laptop_ETL_pipeline)
👉 [Read the full case study](https://yoismail.github.io/portfolio/aliexpress.html)

---

## ⚙️ Tech Stack

### Distributed & Big Data

* PySpark (DataFrames, SQL, JDBC)
* Apache Spark (transformation engine)

### Data Engineering

* Python (pandas, SQLAlchemy, psycopg2, python-dotenv)
* PostgreSQL (star schema, FK referential integrity, indexes)
* SQL (DDL, complex joins, window functions, CTEs)
* ETL Pipelines (modular, idempotent, transactional)
* Dimensional Modeling (Kimball star schema, surrogate keys, conformed dimensions)

### Data Engineering Patterns

* Deterministic SHA-256 surrogate keys
* Idempotent loads via temp-table + LEFT JOIN merge
* Schema validation at every transformation stage
* Type-aware cleaning (DECIMAL preservation for money)
* Custom observability (timed decorators, structured logs)
* Environment-driven configuration (no hard-coded credentials)

### Web Scraping & Automation

* Selenium WebDriver
* BeautifulSoup

### Tools & Workflow

* Git & GitHub (GitHub Actions, GitHub Pages)
* Tableau, Power BI (analytics dashboards)
* Zoho CRM / Mixpanel (product operations)
* VS Code, PyCharm

### Currently Learning

* Apache Airflow (orchestration)
* dbt (analyst-authored transformations)
* Amazon Redshift, Google BigQuery
* Apache Kafka

---

## 🎨 Key Features of the Website

* Responsive and mobile-optimized layout
* Smooth scrolling and interaction design
* Clean, recruiter-focused UI
* Structured project showcase with 4 in-depth case studies
* 7 engineering principles backed by working code references
* Performance-optimized frontend (no frameworks, pure HTML/CSS/JS)

---

## 📈 What I'm Currently Building

* Distributed ETL pipelines at higher scale (PySpark on cluster)
* dbt-layered analytics models on top of warehouse outputs
* Airflow-orchestrated production pipelines with retry/alerting
* SCD Type 2 patterns for slowly changing dimensions

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

If you're hiring for Data Engineering, Analytics, or Technical Operations roles — this repository reflects the level of thinking and execution I bring.
