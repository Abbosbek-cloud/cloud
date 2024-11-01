import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { formSchema, GitAccountForm } from './components/git-account-form'
import { z } from 'zod'
import { useState } from 'react'
import axios from 'axios'
import { BaseResponse } from '@/types/base'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function CreateGitAccount() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    axios
      .post<BaseResponse>('/api/v1/git/create', {
        name: values.name,
        url: values.gitUrl,
        type: values.type,
        token: values.token,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          toast.success('Git account created successfully')
          navigate('/git-accounts')
        } else {
          toast.error(res.data?.message || 'Failed to create git account')
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || 'Failed to create git account'
        )
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Create Git Account
            </h2>
            <p className='text-muted-foreground'>Create a new git account!</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <GitAccountForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
