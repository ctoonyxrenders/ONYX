import React from 'react'
import styles from './style.module.css'

const FileDownload = () => {
    return (
        <svg className={styles.svgIconDownload} viewBox="0 0 201 201" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="201" height="201" fill="url(#pattern0_713_273)" fillOpacity="0.6" />
            <defs>
                <pattern id="pattern0_713_273" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_713_273" transform="scale(0.0111111)" />
                </pattern>
                <image id="image0_713_273" width="90" height="90" xlinkHref="data:image/png;base64,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" />
            </defs>
        </svg>

    )
}

export default FileDownload
