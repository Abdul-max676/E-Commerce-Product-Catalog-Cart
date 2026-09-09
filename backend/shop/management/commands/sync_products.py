import requests
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify
from shop.models import Product


class Command(BaseCommand):
    help = 'Import or update products from DummyJSON.'

    def handle(self, *args, **options):
        try:
            response = requests.get('https://dummyjson.com/products?limit=0', timeout=20)
            response.raise_for_status()
            products = response.json()['products']
        except (requests.RequestException, KeyError) as error:
            raise CommandError(f'Could not sync products: {error}') from error

        for item in products:
            Product.objects.update_or_create(
                external_id=item['id'],
                defaults={
                    'title': item['title'],
                    'slug': f"{slugify(item['title'])}-{item['id']}",
                    'description': item.get('description', ''),
                    'category': item.get('category', 'uncategorized'),
                    'price_usd': item['price'],
                    'stock': item.get('stock', 0),
                    'rating': item.get('rating', 0),
                    'thumbnail': item.get('thumbnail', ''),
                    'images': item.get('images', []),
                    'discount_percentage': item.get('discountPercentage', 0),
                },
            )
        self.stdout.write(self.style.SUCCESS(f'Synced {len(products)} products.'))