<template>
    <main class="TabItemMain">
        <div class="container">
            <div class="excalidraw" id="excalidraw"></div>
        </div>
    </main>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Excalidraw } from '@excalidraw/excalidraw'
import "@excalidraw/excalidraw/index.css"

let root = null
let app = null
export default {
    data() {
        return {
            appState: {
                viewBackgroundColor: '#fff',
                currentItemStrokeColor: '#000000',
                currentItemBackgroundColor: '#ffffff',
                activeTool: 'selection',
                zoom: 1
            }
        }
    },
    mounted() {
        this.initializeExcalidraw()
    },
    unmounted() {
        if (root) {
            root.unmount()
        }
    },
    methods: {
        initializeExcalidraw() {
            const savedElements = localStorage.getItem('excalidrawElements')
            const savedAppState = localStorage.getItem('appState')
            const initialData = savedElements
                ? JSON.parse(savedElements)
                : { elements: [], appState: this.appState }
            const appState = savedAppState ? JSON.parse(savedAppState) : this.appState

            const excalidrawElement = React.createElement(Excalidraw, {
                initialData: initialData,
                onChange: this.handleDrawingChange,
                excalidrawAPI: this.excalidrawAPI,
                langCode: 'zh-CN'
            })

            root = createRoot(document.getElementById('excalidraw'))
            root.render(excalidrawElement)
        },

        handleDrawingChange(elements, newAppState) {
            let state = app.getAppState()
            console.log(state, 'state')

            let { collaborators, ...appState } = state
            console.log(appState, 'appState')

            localStorage.setItem(
                'excalidrawElements',
                JSON.stringify({ elements, appState: appState })
            )
        },

        excalidrawAPI(e) {
            app = e
            window.app = e
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
        height: 3rem;
        line-height: 3rem;
        padding: 0 1rem;
        font-size: 1.2rem;
        background-color: #038fe5;
        color: white;
    }

    .footer {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background-color: #038fe5;
        color: white;
    }

    .excalidraw {
        flex-grow: 1;
        /* 占满剩余空间 */
        height: 100%;
    }
}
</style>