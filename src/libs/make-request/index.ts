// VENDOR
import get from 'lodash/get';
import { useEffect, useState } from 'react'

interface MakeRequestOptionsType {
    body?: any,
    headers?: any,
    silent?: boolean
    lazy?: boolean
    jwt?: string
}

type FetcherOptions = {
    onComplete?: (response: any) => void,
    onError?: (error: Error) => void,
}

const useMakeRequest = (endpoint: string, method: string, options?: MakeRequestOptionsType) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const body = get(options, 'body', null)
    let headers = get(options, 'headers', {})
    const silent = get(options, 'silent', false)
    const lazy = get(options, 'lazy', null)
    const jwt = get(options, 'jwt', null)

    if (jwt) {
        headers = Object.assign(
            { authorization: `bearer ${jwt}` },
                headers
            )
    }

    const fetcher = (variables?: any, options?: FetcherOptions) => {
        const bodyRequest = variables || body
        const onError = get(options, 'onError')
        const onComplete = get(options, 'onComplete')

        if (!silent) {
            setIsLoading(true)
        }

        fetch(
            endpoint,
            {
                method: method,
                body: bodyRequest ? JSON.stringify(bodyRequest) : null,
                headers: {
                    'content-type': 'application/json',
                    ...headers
                },
            }
        )
        .then(res => res.json())
        .then(responseJson => {
            setIsLoading(false)

            if (get(responseJson, 'code') === 400 ||  get(responseJson, 'code') === 401) {
                if (onError) {
                    setError(responseJson)
                    onError(responseJson)
                }
            } else {
                setData(responseJson)

                if (onComplete) {
                    onComplete(responseJson)
                }
            }
        })
        .catch(error => {
            const errorResponse = {
                message: error.message,
                code: 500
            }

            setIsLoading(false)
            // @ts-ignore
            setError(errorResponse)

            if (onError) {
                // @ts-ignore
                onError(errorResponse)
            }
        })
    }

    useEffect(() => {
        if (!lazy) {
            fetcher()
        }
        // eslint-disable-next-line
    }, [])

    return {
        data,
        isLoading,
        error,
        makeRequest: fetcher
    }
}

export default useMakeRequest