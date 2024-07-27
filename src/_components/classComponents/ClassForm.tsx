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

    const handleFinalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setButtonLoading(true);
        // Add your form submission logic here
        console.log('Form submitted', form.values);
        setTimeout(() => {
            setButtonLoading(false);
        }, 2000); // Simulate an async operation
    };

    return (
        <div className="bg-purple-100 min-h-screen flex items-center justify-center">
            <form onSubmit={handleFinalSubmit} className="mx-8 my-6">
                <div className="p-24 flex flex-col justify-center items-center">
                    <h2 className="pb-10 font-bold text-6xl text-neutral-600 text-center">Create Class</h2>
                    <TextInput
                        label="Your Class Name"
                        placeholder="Your Class Name"
                        required
                        className="w-[20rem] mb-4"
                        classNames={classes}
                        {...form.getInputProps('className')}
                    />
                    <Textarea
                        label="Class Description"
                        placeholder="Class Description"
                        required
                        className="w-[20rem] mb-4"
                        classNames={classes}
                        {...form.getInputProps('classDescription')}
                    />
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
