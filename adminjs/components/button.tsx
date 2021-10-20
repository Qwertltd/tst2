import React from 'react'
import styled from 'styled-components'
import { Button, ButtonCSS } from '@adminjs/design-system'
import { BasePropertyProps } from 'adminjs'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { record } = props

    const orderId = record.params['_id']

    // create a new Component looking like button
    const ButtonLikeComponent = styled.a`
        ${ButtonCSS};
    `

    return (
        <ButtonLikeComponent href={`../../api/orderPdfFile/download/?id=${orderId}`}>Download</ButtonLikeComponent>
    )
}

export default Edit