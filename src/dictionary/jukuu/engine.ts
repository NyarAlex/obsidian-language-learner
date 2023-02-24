import {
    HTMLString,
    handleNoResult,
    handleNetWorkError,
    SearchFunction,
    GetSrcPageFunction,
    DictSearchResult,
    fetchDirtyDOM
} from '../helpers';

function getUrl(text: string) {
    text = encodeURIComponent(text.replace(/\s+/g, '+'));
    return "https://www.etymonline.com/word/" + text;
}

export const getSrcPage: GetSrcPageFunction = (text) => {
    return getUrl(text);
};

type EtymonlineSearchResult = DictSearchResult<etymonlineResult>;

export interface etymonlineResult {
    content: HTMLString[];//主内容
    relate: HTMLString[];//相关内容
}

export const search = (
    text: string,
) => {
    return fetchDirtyDOM(getSrcPage(text))
        .catch(handleNetWorkError)
        .then(handleDOM)
        .catch(handleNoResult);
};

function handleDOM(doc: DocumentFragment): EtymonlineSearchResult {
    const result: etymonlineResult = {
        content: [],
        relate: [],
    }
    //获取页面主要内容
    const contentNodes = doc.querySelectorAll(".word--C9UPa:not(.word--C9UPa.word_4pc--2SZw8)");
    [...contentNodes].forEach(node => {
        let container = document.createElement('div');
        container.appendChild(node);
        result.content.push(container["innerHTML"] as HTMLString);
    });
    //获取延伸内容
    const relateNodes = doc.querySelectorAll(".word--C9UPa.word_4pc--2SZw8");
    [...relateNodes].forEach(node => {
        let container = document.createElement('div');
        container.appendChild(node);
        result.relate.push(container["innerHTML"] as HTMLString);
    });
    return { result };
}
