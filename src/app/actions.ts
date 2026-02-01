'use server';

import { auditSpecification } from '@/lib/gemini';

export async function analyzeSpecAction(formData: FormData) {
    const content = formData.get('content') as string;
    if (!content) return { error: "No content provided." };

    const analysis = await auditSpecification(content);
    return { analysis };
}
