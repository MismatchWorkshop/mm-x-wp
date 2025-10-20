import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { color, position } = attributes;

    const blockProps = useBlockProps.save({
        className: `brand-accent brand-accent--${position}`
    });

    return (
        <div {...blockProps} data-color={color}>
            <svg 
                width="311" 
                height="586" 
                viewBox="0 0 311 586" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M521.041 964.461C490.165 990.175 443.38 988.404 414.252 959.111L414.25 959.109L40.9639 584.633L31.9434 574.654C-7.31676 527.058 -7.31365 457.931 31.9512 410.338L40.9639 400.368L414.25 25.8906L414.252 25.8887C443.38 -3.40403 490.165 -5.17481 521.041 20.54L527.325 25.958C552.899 51.7352 558.188 89.9192 543.168 121.017L543.169 121.018L532.254 142.968L532.232 143.011L532.212 143.056C432.669 364.389 432.669 620.612 532.212 841.945L532.232 841.989L532.254 842.032L543.168 863.983C558.189 895.083 552.899 933.272 527.319 959.049L521.041 964.461Z" 
                    stroke={color} 
                    strokeWidth="5"
                    fill="none"
                />
            </svg>
        </div>
    );
}