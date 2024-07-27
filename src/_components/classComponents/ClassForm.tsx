'use client';

import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from 'react';
import classes from './../../styles/FloatingLabelInput.module.css';

export default function ClassForm() {
    const form = useForm({
        initialValues: {
            className: "",
            classDescription: ""
        },
    });

    const [buttonLoading, setButtonLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const floating = value.trim().length !== 0 || focused || undefined;

    const handleFinalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setButtonLoading(true);

        console.log('Form submitted', form.values);
        setTimeout(() => {
            setButtonLoading(false);
        }, 2000); 
    };

    return (
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <form onSubmit={handleFinalSubmit} className="flex flex-col">
                    <h2 className="pb-6 font-bold text-4xl text-neutral-600 text-center">Create Class</h2>
                    <TextInput
                        label="Your Class Name"
                        placeholder="Your Class Name"
                        required
                        className="w-full mb-6 " // Added mb-6 for more space between inputs
                        classNames={classes}
                        {...form.getInputProps('className')}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        mt="md"
                        autoComplete="nope"
                        data-floating={floating}
                        labelProps={{ 'data-floating': floating }}
                    />
                    <Textarea
                        label="Class Description"
                        placeholder="Class Description"
                        required
                        className="w-full mb-6"
                        classNames={classes}
                        {...form.getInputProps('classDescription')}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        mt="md"
                        autoComplete="nope"
                        data-floating={floating}
                        labelProps={{ 'data-floating': floating, className: "text-lg" }}
                    />
                    <div className="flex justify-end">
                        <Button
                            className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'
                            type='submit'
                            loading={buttonLoading}
                        >
                            {buttonLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
