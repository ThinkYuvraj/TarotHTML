import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("Before removals, lines:", content.count('\n'))

# Sections to remove (identified by their comment markers)
patterns = [
    r'  <!-- =+\s+HOW WE WORK.*?</section>',
    r'  <!-- =+\s+CARD GALLERY / ARCHETYPES.*?</section>',
    r'  <!-- =+\s+FAQ ACCORDION.*?</section>',
    r'  <!-- =+\s+STUDIO VISIT BANNER.*?</section>',
    r'  <!-- =+\s+INSTAGRAM / ARCHIVE FEED.*?</section>',
    r'  <!-- =+\s+PRE-FOOTER CTA.*?</section>',
]

for pattern in patterns:
    new_content = re.sub(pattern, '', content, flags=re.DOTALL)
    if new_content != content:
        print("Removed section matching:", pattern[:50])
    content = new_content

# Reduce section padding
content = content.replace('py-24 lg:py-32', 'py-16 lg:py-20')
content = content.replace('py-20 lg:py-24', 'py-14 lg:py-16')
content = content.replace('"py-24 ', '"py-16 ')
content = content.replace('"py-28 lg:py-36', '"py-16 lg:py-20')

# Remove FAQ and CARDS from nav
faq_link = '<li><a href="#faq" class="text-xs font-medium tracking-[0.2em] text-[#a99fb7] hover:text-[#e6cb87] transition-colors">FAQ</a></li>'
gallery_link = '<li><a href="#gallery" class="text-xs font-medium tracking-[0.2em] text-[#a99fb7] hover:text-[#e6cb87] transition-colors">CARDS</a></li>'
content = content.replace(faq_link, '')
content = content.replace(gallery_link, '')

# Add BOOK link to nav (before the WhatsApp button area)
if '#contact" class="text-xs font-medium tracking-[0.2em] text-[#a99fb7] hover:text-[#e6cb87] transition-colors">BOOK' not in content:
    reviews_link = '<li><a href="#reviews" class="text-xs font-medium tracking-[0.2em] text-[#a99fb7] hover:text-[#e6cb87] transition-colors">TESTIMONIALS</a></li>'
    content = content.replace(reviews_link, reviews_link + '\n        <li><a href="#contact" class="text-xs font-medium tracking-[0.2em] text-[#a99fb7] hover:text-[#e6cb87] transition-colors">BOOK</a></li>')

print("After removals, lines:", content.count('\n'))

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
