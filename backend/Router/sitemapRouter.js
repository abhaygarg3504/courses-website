import express from 'express'
import SitemapController from '../Controller/sitemapController.js';
const router = express.Router();

router.get("/sitemap.xml",SitemapController.mainSitemap)

router.get("/pageSitemap.xml",SitemapController.pageSitemap)

router.get("/blogSitemap.xml",SitemapController.blogSitemap)

router.get("/courseSitemap1.xml",SitemapController.courseSitemap1)

router.get("/courseSitemap2.xml",SitemapController.courseSitemap2)

export default router;