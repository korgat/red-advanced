import { Settings } from 'lucide-react'
import React from 'react'

import { SettingForm } from '@/components/form/settings-form'

import Heading from '@/ui/heading/Heading'

import { cn } from '@/lib/utils'

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const SettingsSection = (props: SettingsSectionProps) => {
	const { className = '', ...rest } = props
	return (
		<div
			{...rest}
			className={cn('p-layout h-full', {}, [className])}
		>
			<Heading
				className='text-3xl gap-3'
				icon={Settings}
			>
				Settings
			</Heading>
			<SettingForm />
		</div>
	)
}

export default SettingsSection
