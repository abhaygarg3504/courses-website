import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function mainSitemap(req,res){
    res.set('Content-Type', 'application/xml');
    const path = join(__dirname,"../Sitemaps/sitemap.xml")
    res.sendFile(path)
}

function pageSitemap(req,res){
    res.set('Content-Type', 'application/xml');
    const path = join(__dirname,"../Sitemaps/pageSitemap.xml")
    res.sendFile(path)
}

function blogSitemap(req,res){
    res.set('Content-Type', 'application/xml');
    const path = join(__dirname,"../Sitemaps/blogSitemap.xml")
    res.sendFile(path)
}

function courseSitemap1(req,res){
    res.set('Content-Type', 'application/xml');
    const path = join(__dirname,"../Sitemaps/courseSitemap1.xml")
    res.sendFile(path)
}

function courseSitemap2(req,res){
    res.set('Content-Type', 'application/xml');
    const path = join(__dirname,"../Sitemaps/courseSitemap2.xml")
    res.sendFile(path)
}


const SitemapController = {mainSitemap,pageSitemap,courseSitemap1,courseSitemap2,blogSitemap}

export default SitemapController;