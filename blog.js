// 共用函數
async function loadArticles() {
    const response = await fetch('articles.json');
    return await response.json();
}

// 首頁文章列表
async function renderArticleList() {
    const articles = await loadArticles();
    const container = document.getElementById('article-list');
    
    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.className = 'article-item';
        articleEl.innerHTML = `
            <h2><a href="article.html?slug=${article.slug}">${article.title}</a></h2>
            <div class="meta">
                <time>${article.date}</time>
            </div>
            <p>${article.description}</p>
        `;
        container.appendChild(articleEl);
    });
}

// 文章頁面渲染
async function renderArticleContent() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    
    if (!slug) return;
    
    const articles = await loadArticles();
    const article = articles.find(a => a.slug === slug);
    
    if (article) {
        const response = await fetch(`content/${article.filename}`);
        const markdown = await response.text();
        document.getElementById('article-content').innerHTML = marked.parse(markdown);
        document.title = article.title;
    }
}

// 根據頁面初始化
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    renderArticleList();
} else if (window.location.pathname.endsWith('article.html')) {
    renderArticleContent();
} 