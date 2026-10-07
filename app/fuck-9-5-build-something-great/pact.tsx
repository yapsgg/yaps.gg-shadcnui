'use client'

import { useEffect, useState } from 'react'
import { Check, PenLine, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const SEED_COUNT = 2247
const COUNT_KEY = 'yaps_pact_count'
const SIGNED_KEY = 'yaps_pact_signed'

export function PactButton() {
  const [count, setCount] = useState(SEED_COUNT)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    try {
      const storedCount = Number(localStorage.getItem(COUNT_KEY))
      if (storedCount > SEED_COUNT) setCount(storedCount)
      else localStorage.setItem(COUNT_KEY, String(SEED_COUNT))
      setSigned(localStorage.getItem(SIGNED_KEY) === '1')
    } catch {
      // localStorage unavailable — the pact still counts in spirit
    }
  }, [])

  const sign = () => {
    if (signed) {
      toast(
        'you already signed. procrastinating on the pact is still procrastinating 😭',
      )
      return
    }

    const next = count + 1
    setCount(next)
    setSigned(true)
    try {
      localStorage.setItem(COUNT_KEY, String(next))
      localStorage.setItem(SIGNED_KEY, '1')
    } catch {
      // no storage, no problem. ship anyway
    }

    toast.success('certified delulu. welcome to the builders’ side 🐴', {
      description: 'now close this tab and go ship something.',
    })
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <Button
        size='lg'
        onClick={sign}
        variant={signed ? 'secondary' : 'default'}
        className='cursor-pointer gap-2 rounded-full px-8'
      >
        {signed ? (
          <>
            <Check className='size-4' />
            pact signed
          </>
        ) : (
          <>
            <PenLine className='size-4' />
            sign the pact
          </>
        )}
      </Button>
      <p
        aria-live='polite'
        className='font-mono text-xs text-muted-foreground'
      >
        {count.toLocaleString('en-US')} builders signed · zero emails collected
      </p>
    </div>
  )
}

export function ShareButton() {
  const caption =
    "someday is a larp. i'm shipping instead. → yaps.gg/fuck-9-5-build-something-great"

  const share = async () => {
    try {
      await navigator.clipboard.writeText(caption)
      toast.success('caption copied. go be annoying about it.', {
        description: 'paste it on LinkedIn, X, or the group chat.',
      })
    } catch {
      toast.error('couldn’t copy automatically — steal it by hand:', {
        description: caption,
      })
    }
  }

  return (
    <Button
      variant='outline'
      onClick={share}
      className='cursor-pointer gap-2 rounded-full'
    >
      <Share2 className='size-4' />
      copy the share caption
    </Button>
  )
}
