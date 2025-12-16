import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/producto.entity';

@Injectable()
export class ProductoSeedService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async seed() {
    // Mapa de imágenes por nombre (URLs de Wikipedia Commons con licencia libre)
    const imagenes: Record<string, string> = {
      'Manzanas Fuji': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      'Naranjas Valencia': 'https://juanesparraguito.com/cdn/shop/files/FotosWeb_parte1_Mesadetrabajo1copia4_697bb070-812f-417b-b38c-085882796d2b.jpg?v=1715966904&width=1214',
      'Plátanos Cavendish': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',
      'Zanahorias Orgánicas': 'https://juanesparraguito.com/cdn/shop/files/FotosWeb_parte3_Mesadetrabajo1copia8.jpg?v=1711036674&width=1214',
      'Espinacas Frescas': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWbQfd5czRPnt-l4jtxecfF33OMYMmXFAdlQ&s',
      'Pimientos Tricolores': 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201810/15/00118164100010____2__325x325.jpg',
      'Miel Orgánica': 'https://adagio.cl/cdn/shop/files/Adagio-004_5d8bb976-a4b1-4803-b526-a6a4f9d15190.jpg?v=1701197991&width=1280',
      'Quinua Orgánica': 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now06311/l/13.jpg',
      'Leche Entera': 'https://www.mitiendacolun.cl/media/catalog/product/m/i/mid_leche_entera_1lt.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    };

    const categoriaImagenes: Record<string, string> = {
      'Frutas Frescas': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      'Verduras Orgánicas': 'https://upload.wikimedia.org/wikipedia/commons/2/28/Carrot.jpg',
      'Productos Orgánicos': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Honey_and_honeycomb.jpg',
      'Productos Lácteos': 'https://upload.wikimedia.org/wikipedia/commons/8/86/Milk_glass.jpg',
    };

    // Si ya existen productos, actualizar imágenes faltantes o de placeholder
    const existentes = await this.productosRepository.find();
    if (existentes.length > 0) {
      let actualizados = 0;
      for (const p of existentes) {
        let url = imagenes[p.nombre];
        if (!url) {
          url = categoriaImagenes[p.categoria];
        }
        if (url) {
          p.imagen = url;
          await this.productosRepository.save(p);
          actualizados++;
          console.log(`✓ Imagen actualizada: ${p.nombre}`);
        }
      }
      if (actualizados === 0) {
        console.log('Productos ya existen. Imágenes al día. Seed de productos omitido.');
      } else {
        console.log(`Imágenes actualizadas para ${actualizados} productos.`);
      }
      return;
    }

    console.log('Iniciando seed de productos...');

    const productos = [
      // Frutas Frescas
      {
        nombre: 'Manzanas Fuji',
        descripcion: 'Deliciosas manzanas Fuji frescas, crujientes y dulces. Perfectas para snack o postres.',
        precio: 3.99,
        stock: 120,
        categoria: 'Frutas Frescas',
        imagen: imagenes['Manzanas Fuji'],
        origen: 'Valle del Cauca',
        practicas_sostenibles: 'Certificación orgánica; riego por goteo; cero pesticidas sintéticos',
        recetas_sugeridas: 'Tarta de manzana rústica; Ensalada de manzana y nueces; Manzana asada con canela',
        vendedor_id: 1,
      },
      {
        nombre: 'Naranjas Valencia',
        descripcion: 'Naranjas Valencia jugosas y llenas de vitamina C, ideales para zumo fresco.',
        precio: 2.99,
        stock: 140,
        categoria: 'Frutas Frescas',
        imagen: imagenes['Naranjas Valencia'],
        origen: 'Huila',
        practicas_sostenibles: 'Polinización asistida; control biológico de plagas',
        recetas_sugeridas: 'Jugo de naranja recién exprimido; Ensalada de cítricos con menta; Pollo glaseado con naranja',
        vendedor_id: 1,
      },
      {
        nombre: 'Plátanos Cavendish',
        descripcion: 'Plátanos Cavendish maduros y frescos, ricos en potasio.',
        precio: 1.99,
        stock: 160,
        categoria: 'Frutas Frescas',
        imagen: imagenes['Plátanos Cavendish'],
        origen: 'Urabá Antioqueño',
        practicas_sostenibles: 'Compostaje in situ; sombra natural; manejo integrado de cultivos',
        recetas_sugeridas: 'Batido de banano y avena; Pan de banano casero; Banano caramelizado',
        vendedor_id: 1,
      },

      // Verduras Orgánicas
      {
        nombre: 'Zanahorias Orgánicas',
        descripcion: 'Zanahorias 100% orgánicas, sin pesticidas, crujientes y dulces.',
        precio: 2.49,
        stock: 110,
        categoria: 'Verduras Orgánicas',
        imagen: imagenes['Zanahorias Orgánicas'],
        origen: 'Boyacá',
        practicas_sostenibles: 'Rotación de cultivos; abonos verdes; certificación orgánica local',
        recetas_sugeridas: 'Crema de zanahoria y jengibre; Zanahorias asadas con romero; Ensalada rallada con limón',
        vendedor_id: 1,
      },
      {
        nombre: 'Espinacas Frescas',
        descripcion: 'Espinacas frescas ricas en hierro y nutrientes, ideales para ensaladas y batidos.',
        precio: 3.49,
        stock: 90,
        categoria: 'Verduras Orgánicas',
        imagen: imagenes['Espinacas Frescas'],
        origen: 'Cundinamarca',
        practicas_sostenibles: 'Riego con captación de lluvia; control biológico; suelos vivos',
        recetas_sugeridas: 'Ensalada de espinacas y fresas; Salteado de espinacas al ajo; Smoothie verde',
        vendedor_id: 1,
      },
      {
        nombre: 'Pimientos Tricolores',
        descripcion: 'Pimientos tricolores frescos (rojo, amarillo y verde) llenos de vitamina C.',
        precio: 4.99,
        stock: 80,
        categoria: 'Verduras Orgánicas',
        imagen: imagenes['Pimientos Tricolores'],
        origen: 'Antioquia',
        practicas_sostenibles: 'Invernadero eficiente; control de plagas con feromonas; energía solar parcial',
        recetas_sugeridas: 'Salteado de pimientos y pollo; Fajitas vegetarianas; Pimientos al horno con queso',
        vendedor_id: 1,
      },

      // Productos Orgánicos
      {
        nombre: 'Miel Orgánica',
        descripcion: 'Miel 100% orgánica, pura y sin refinar, con notas florales.',
        precio: 8.99,
        stock: 60,
        categoria: 'Productos Orgánicos',
        imagen: imagenes['Miel Orgánica'],
        origen: 'Eje Cafetero',
        practicas_sostenibles: 'Apicultura libre de antibióticos; conservación de polinizadores',
        recetas_sugeridas: 'Té con miel y limón; Granola casera; Aderezo de miel y mostaza',
        vendedor_id: 1,
      },
      {
        nombre: 'Quinua Orgánica',
        descripcion: 'Quinua orgánica de alta calidad, proteína completa y sin gluten.',
        precio: 9.99,
        stock: 70,
        categoria: 'Productos Orgánicos',
        imagen: imagenes['Quinua Orgánica'],
        origen: 'Nariño',
        practicas_sostenibles: 'Agricultura andina tradicional; cero agroquímicos',
        recetas_sugeridas: 'Ensalada de quinua y vegetales; Quinua con leche; Bowl de quinua con pollo',
        vendedor_id: 1,
      },

      // Productos Lácteos
      {
        nombre: 'Leche Entera',
        descripcion: 'Leche entera fresca y pasteurizada, rica en calcio y vitamina D.',
        precio: 2.99,
        stock: 150,
        categoria: 'Productos Lácteos',
        imagen: imagenes['Leche Entera'],
        origen: 'Caldas',
        practicas_sostenibles: 'Bienestar animal certificado; pastoreo rotacional; biogás para energía',
        recetas_sugeridas: 'Avena con leche; Flan casero; Café con leche cremoso',
        vendedor_id: 1,
      },
    ];

    for (const producto of productos) {
      const nuevoProducto = this.productosRepository.create(producto);
      await this.productosRepository.save(nuevoProducto);
      console.log(`✓ Producto creado: ${producto.nombre}`);
    }

    console.log('Seed de productos completado.');
  }
}
