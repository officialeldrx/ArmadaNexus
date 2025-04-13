"use client"

import { useState, useEffect } from "react"

export default function LoadingSymbol() {
    return (
        <div className="flex items-center justify-center h-full w-full  scale-50">
            <svg
                width="65" height="65" viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
                style={{ animationDuration: "3s" }}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.5078 64.4591C50.1809 64.4591 64.5078 50.1322 64.5078 32.4591C64.5078 14.786 50.1809 0.459091 32.5078 0.459091C14.8347 0.459091 0.507812 14.786 0.507812 32.4591C0.507812 50.1322 14.8347 64.4591 32.5078 64.4591ZM24.834 5.25347C29.0815 4.11018 33.4654 3.94724 37.6785 4.68417C34.4529 6.74348 32.3466 8.66152 30.4813 10.36C30.1578 10.6547 29.8415 10.9427 29.5279 11.2237C27.3235 13.1988 25.1925 14.8984 21.2143 16.3529C21.7646 12.7486 22.6351 10.0191 23.4174 8.11756C23.9098 6.92054 24.3685 6.04872 24.6927 5.49106C24.7432 5.40428 24.7904 5.32509 24.834 5.25347ZM19.9349 7.15883C16.1257 9.10384 12.7212 11.8705 10.0153 15.3384C10.0235 15.4219 10.0334 15.5135 10.0453 15.6132C10.1216 16.2537 10.2795 17.2261 10.606 18.4786C11.1246 20.4683 12.0706 23.1726 13.7986 26.3832C16.1022 22.8286 16.7826 20.1891 17.3559 17.2854C17.4375 16.8723 17.517 16.4519 17.5983 16.0219C18.067 13.5432 18.5963 10.744 19.9349 7.15883ZM7.33918 19.6247C5.43781 23.4559 4.35094 27.7061 4.24285 32.1034C4.29918 32.1655 4.36173 32.2332 4.43064 32.3062C4.87347 32.7753 5.57945 33.4624 6.58769 34.274C8.18933 35.5634 10.5599 37.1722 13.8603 38.722C13.5936 34.4946 12.568 31.9691 11.299 29.2952C11.1185 28.9147 10.932 28.5297 10.7412 28.1359C9.64133 25.8656 8.39928 23.3018 7.33918 19.6247ZM4.54819 36.5139C5.20811 40.7397 6.77495 44.8373 9.22589 48.4899C9.30774 48.5081 9.39791 48.5273 9.49632 48.5471C10.1287 48.6743 11.1018 48.8276 12.3937 48.9081C14.4458 49.0359 17.3103 48.9805 20.8997 48.3401C18.2409 45.0427 15.9453 43.573 13.3652 42.1226C12.9981 41.9163 12.6236 41.7097 12.2404 41.4983C10.0314 40.2799 7.53702 38.9039 4.54819 36.5139ZM27.3372 60.234C31.5503 60.971 35.9342 60.808 40.1817 59.6647C40.2253 59.5931 40.2725 59.5139 40.323 59.4271C40.6472 58.8695 41.1059 57.9976 41.5983 56.8006C42.3806 54.8991 43.2511 52.1696 43.8014 48.5653C39.8232 50.0197 37.6922 51.7194 35.4878 53.6945C35.1742 53.9755 34.8579 54.2635 34.5343 54.5582C32.6691 56.2567 30.5628 58.1747 27.3372 60.234ZM55.0005 49.5797C52.2945 53.0476 48.89 55.8143 45.0808 57.7593C46.4194 54.1742 46.9487 51.375 47.4174 48.8962L47.4189 48.8881C47.4997 48.4609 47.5787 48.0433 47.6598 47.6328C48.2331 44.729 48.9135 42.0896 51.2171 38.535C52.9451 41.7456 53.8911 44.4499 54.4097 46.4395C54.7362 47.692 54.8941 48.6644 54.9704 49.305C54.9823 49.4046 54.9922 49.4963 55.0005 49.5797ZM57.6765 45.2935C59.5778 41.4623 60.6647 37.2121 60.7728 32.8148C60.7165 32.7527 60.6539 32.6849 60.585 32.612C60.1422 32.1429 59.4362 31.4558 58.428 30.6442C56.8263 29.3548 54.4557 27.746 51.1554 26.1962C51.422 30.4236 52.4476 32.9491 53.7166 35.623C53.8966 36.0024 54.0826 36.3863 54.2729 36.779L54.2744 36.7823C55.3743 39.0526 56.6164 41.6163 57.6765 45.2935ZM55.7898 16.4283C58.2407 20.0809 59.8076 24.1785 60.4675 28.4043C57.4787 26.0143 54.9843 24.6384 52.7754 23.4199C52.3927 23.2089 52.017 23.0016 51.6504 22.7956C49.0703 21.3452 46.7747 19.8755 44.116 16.5781C47.7054 15.9377 50.5698 15.8823 52.622 16.0101C53.9138 16.0906 54.887 16.2439 55.5194 16.3711C55.6178 16.3909 55.7079 16.4101 55.7898 16.4283ZM23.0398 59.0935C18.9131 57.5706 15.242 55.1689 12.2305 52.1318C16.053 52.3165 18.8805 51.9693 21.3844 51.6618L21.3969 51.6603L21.4016 51.6597C21.8299 51.6072 22.2488 51.5557 22.6617 51.5084C25.6022 51.1714 28.3236 51.0167 32.4105 52.13C29.8776 54.7527 27.5892 56.4764 25.8515 57.5756C24.7576 58.2676 23.8794 58.7138 23.2924 58.9813C23.201 59.0229 23.1167 59.0603 23.0398 59.0935ZM41.9758 5.82468C46.1024 7.3476 49.7736 9.74928 52.7851 12.7864C48.9626 12.6017 46.1351 12.9489 43.6312 13.2563C43.1972 13.3096 42.7719 13.3618 42.3539 13.4098C39.4133 13.7468 36.692 13.9015 32.6051 12.7882C35.138 10.1655 37.4264 8.44176 39.1641 7.34254C40.2579 6.65059 41.1362 6.20443 41.7232 5.93688C41.8145 5.89524 41.8988 5.85793 41.9758 5.82468Z"
                    fill="currentColor"
                    className="text-foreground"
                />
            </svg>
        </div>
    )
}