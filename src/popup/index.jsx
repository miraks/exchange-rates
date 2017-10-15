import '@/popup/index.sass'

import { render, h } from 'preact'
import Main from '@/popup/components/Main'

const container = document.createElement('div')
document.body.appendChild(container)
render(<Main/>, container)
