import React, { ReactNode } from 'react';

interface NavItemProps {
    Icon?: ReactNode
}

const NavItem = (props: NavItemProps) => {
    return (
        <li className="nav-item">
            <a href="#" className="nav-link">
                {props.Icon}
            </a>
        </li>
    );
}

export default NavItem;
