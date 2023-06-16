import keyWrod from './keyWord.js'

// 检测是否有敏感词汇
export const checkArticle = (article) => {
    const noPassWords = [];
    for (let i = 0; i < keyWrod.length; i++) {
        // 检测是否有敏感词汇
        if (article.indexOf(keyWrod[i]) > -1) {
            noPassWords.push(keyWrod[i])
            
        }
    }
    return noPassWords
}