'use client';

import { SegmentedControl, TextInput } from "@mantine/core";
import { useState, useRef } from 'react';
import classes from './../../styles/FloatingLabelInput.module.css';

export default function ClassForm() {

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const floating = value.trim().length !== 0 || focused || undefined;
    const formRef = useRef<HTMLFormElement>(null);

    const handleFinalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setButtonLoading(true);
        // Add your form submission logic here
        console.log('Form submitted');
        setTimeout(() => {
            setButtonLoading(false);
        }, 2000); // Simulate an async operation
    };

    return (
        <div className="bg-purple-100 min-h-screen flex items-center justify-center">
            <form ref={formRef} onSubmit={handleFinalSubmit} className="mx-8 my-6">
                <div className="p-24 flex flex-col justify-center items-center">
                    <h2 className="pb-10 font-bold text-6xl text-neutral-600 text-center">Create Class</h2>
                    <TextInput
                        label="Your Class Name"
                        placeholder="Your Class Name"
                        required
                        className="w-[20rem] mb-4"
                        classNames={classes}
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        mt="md"
                        autoComplete="nope"
                        data-floating={floating}
                        labelProps={{ 'data-floating': floating }}
                    />

                    <div className="flex flex-row gap-4">
                    <TextInput
                        label="Class Description"
                        placeholder="Class Description"
                        required
                        className="w-[20rem] mb-4"
                        classNames={classes}
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        mt="md"
                        autoComplete="nope"
                        data-floating={floating}
                        labelProps={{ 'data-floating': floating }}
                    />
                    </div>
                    <button
                        className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'
                        type='submit'
                    >
                        {buttonLoading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
