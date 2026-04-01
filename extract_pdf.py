import pdfplumber
import sys

pdf_path = r'D:\srk\dataset_website_pre\app\public\_Copy___Copy_ (5).pdf'
output_path = r'D:\srk\dataset_website_pre\pdf_extracted.txt'

with pdfplumber.open(pdf_path) as pdf, open(output_path, 'w', encoding='utf-8') as out:
    total_pages = len(pdf.pages)
    print(f'Total pages: {total_pages}', flush=True)
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            out.write(f'\n--- Page {i+1} ---\n')
            out.write(text)
            out.write('\n')
        print(f'Processed page {i+1}/{total_pages}', flush=True)
print('Extraction complete!')
