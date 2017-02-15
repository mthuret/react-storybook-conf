import React, { PropTypes, Component } from 'react';
import { range } from 'lodash';
import LinkList from './LinkList';
import classNames from './classnames.js';
import './Pagination.css';

const cx = classNames('Pagination');

function getPagesDisplayedCount(padding, total) {
    return Math.min(2 * padding + 1, total);
}

function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
    if (current <= padding) {
        return current;
    }

    if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
    }

    return padding;
}

function getPages(page, total, padding) {
    const totalDisplayedPages = getPagesDisplayedCount(padding, total);
    if (totalDisplayedPages === total) return range(1, total + 1);

    const paddingLeft = calculatePaddingLeft(
        page,
        padding,
        total,
        totalDisplayedPages
    );
    const paddingRight = totalDisplayedPages - paddingLeft;

    const first = page - paddingLeft;
    const last = page + paddingRight;
    return range(first + 1, last + 1);
}

class Pagination extends Component {
    static propTypes = {
        nbPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        canRefine: PropTypes.bool,

        listComponent: PropTypes.func,

        showFirst: PropTypes.bool,

        showPrevious: PropTypes.bool,

        showNext: PropTypes.bool,

        showLast: PropTypes.bool,

        pagesPadding: PropTypes.number,

        maxPages: PropTypes.number,
    };

    static defaultProps = {
        listComponent: LinkList,
        showFirst: true,
        showPrevious: true,
        showNext: true,
        showLast: true,
        pagesPadding: 3,
        maxPages: Infinity,
        canRefine: true,
    };

    getItem(modifier, translationKey, value) {
        const {
            nbPages,
            maxPages,
            translate,
        } = this.props;
        return {
            key: `${modifier}.${value}`,
            modifier,
            disabled: value < 1 ||
            value >= Math.min(maxPages, nbPages),
            label: value,
            value,
            ariaLabel: value,
        };
    }

    render() {
        const {
            nbPages,
            maxPages,
            currentPage,
            pagesPadding,
            showFirst,
            showPrevious,
            showNext,
            showLast,
            onClick,
            listComponent: ListComponent,
            ...otherProps
        } = this.props;
        const totalPages = Math.min(nbPages, maxPages);
        const lastPage = totalPages;

        let items = [];
        if (showFirst) {
            items.push({
                key: 'first',
                modifier: 'itemFirst',
                disabled: currentPage === 1,
                label: ' « ',
                value: 1,
            });
        }
        if (showPrevious) {
            items.push({
                key: 'previous',
                modifier: 'itemPrevious',
                disabled: currentPage === 1,
                label: ' ‹ ',
                value: currentPage - 1,
            });
        }

        const samePage = {
            valueOf: () => currentPage,
            isSamePage: true,
        };

        items = items.concat(
            getPages(currentPage, totalPages, pagesPadding).map(value => ({
                key: value,
                modifier: 'itemPage',
                label: value,
                value: value === currentPage ? samePage : value,
            }))
        );
        if (showNext) {
            items.push({
                key: 'next',
                modifier: 'itemNext',
                disabled: currentPage === lastPage || lastPage <= 1,
                label: " › ",
                value: currentPage + 1,
            });
        }
        if (showLast) {
            items.push({
                key: 'last',
                modifier: 'itemLast',
                disabled: currentPage === lastPage || lastPage <= 1,
                label: ' » ',
                value: lastPage,
            });
        }

        return (
            <ListComponent
                {...otherProps}
                cx={cx}
                items={items}
                selectedItem={currentPage}
                onSelect={onClick}
            />
        );
    }
}

export default Pagination;
