import React, { PropTypes, Component } from 'react';
import { has, omit } from 'lodash';

class Link extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    onClick = e => {
        this.props.onClick();
        e.preventDefault();
    };

    render() {
        return (
            <a
                {...omit(this.props, 'onClick') }
                onClick={this.onClick}
                href={'#'}
            />
        );
    }
}

export default class LinkList extends Component {
    static propTypes = {
        cx: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.object,
                ]).isRequired,

                key: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]),

                label: PropTypes.node,

                modifier: PropTypes.string,
                ariaLabel: PropTypes.string,
                disabled: PropTypes.bool,
            })
        ),
        selectedItem: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object,
        ]),
        onSelect: PropTypes.func.isRequired,
        canRefine: PropTypes.bool,
    };

    render() {
        const {cx, items, selectedItem, onSelect, canRefine} = this.props;
        return (
            <ul {...cx('root', !canRefine && 'noRefinement') }>
                {items.map(item =>
                    <li
                        key={has(item, 'key') ? item.key : item.value}
                        {...cx(
                            'item',
                            // on purpose == following, see
                            // https://github.com/algolia/instantsearch.js/commit/bfed1f3512e40fb1e9989453582b4a2c2d90e3f2
                            // eslint-disable-next-line
                            item.value == selectedItem && !item.disabled && 'itemSelected',
                            item.disabled && 'itemDisabled',
                            item.modifier
                        ) }
                        disabled={item.disabled}
                    >
                        {item.disabled ?
                            <span {...cx('itemLink', 'itemLinkDisabled') }>
                                {has(item, 'label') ? item.label : item.value}
                            </span> :
                            <Link
                                {...cx('itemLink', item.value === selectedItem && 'itemLinkSelected') }
                                aria-label={item.ariaLabel}
                                onClick={onSelect.bind(null, item.value)}
                            >
                                {has(item, 'label') ? item.label : item.value}
                            </Link>
                        }
                    </li>
                )}
            </ul>
        );
    }
}
