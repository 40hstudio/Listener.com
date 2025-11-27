
function paginationHandler() {
    const pageCount = document.querySelector('.w-page-count');
    const currentCount = document.querySelector('[data-pagination-count="current"]');
    const totalCount = document.querySelector('[data-pagination-count="total"]');

    function counting() {
        if (pageCount) {
            const [current, total] = pageCount.textContent.split('/');
            if (currentCount) currentCount.textContent = current.trim();
            if (totalCount) totalCount.textContent = total.trim();
        }
    }

    counting();

    if (pageCount) {
        const observer = new MutationObserver(counting);
        observer.observe(pageCount, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }
};

export default function initBlog() {
    paginationHandler();
}