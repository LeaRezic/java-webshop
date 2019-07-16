Java web project assignment
--

**About**: creating a JavaEE web application for educational purposes - imaginary webshop specialised in board games and similar produce.

 **Technology stack**: Jave servlet REST API, React FE application (using TypeScript), PostgreSQL database, Redis for cache & Glassfish server (Glassfish locally, Tomcat in production). Developing on Linux, Ubuntu 18.04.

**Project Structure**: project is split into several projects within the root _webshop_ folder.
1. Webshop-components (FE) 
2. Webshop-db
3. Webshop-web (BE)

**Deployment info**
* deployed to a VPS with Ubuntu ([Linode](https://www.linode.com/))
* using a free [CARNet domain](https://domene.hr/portal/register) - learezic.from.hr
* all traffic goes through NGINX
  * serves static frontend for learezic.from.hr
  * proxies api.learezic.from.hr to application server
* using Tomcat as application server
* free SSL by [letsencrypt](https://letsencrypt.org/)
