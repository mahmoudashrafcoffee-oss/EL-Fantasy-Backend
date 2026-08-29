import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawTeams = [
  {
    "id": "egy_001",
    "name_en": "Al Ahly SC",
    "name_ar": "الأهلي",
    "short_name": "AHL",
    "logo": "assets/logos/al_ahly.png"
  },
  {
    "id": "egy_002",
    "name_en": "Zamalek SC",
    "name_ar": "الزمالك",
    "short_name": "ZAM",
    "logo": "assets/logos/zamalek.png"
  },
  {
    "id": "egy_003",
    "name_en": "Pyramids FC",
    "name_ar": "بيراميدز",
    "short_name": "PYR",
    "logo": "assets/logos/pyramids.png"
  },
  {
    "id": "egy_004",
    "name_en": "Al Masry SC",
    "name_ar": "المصري البورسعيدي",
    "short_name": "MAS",
    "logo": "assets/logos/al_masry.png"
  },
  {
    "id": "egy_005",
    "name_en": "Ceramica Cleopatra FC",
    "name_ar": "سيراميكا كليوباترا",
    "short_name": "CER",
    "logo": "assets/logos/ceramica_cleopatra.png"
  },
  {
    "id": "egy_006",
    "name_en": "Smouha SC",
    "name_ar": "سموحة",
    "short_name": "SMO",
    "logo": "assets/logos/smouha.png"
  },
  {
    "id": "egy_007",
    "name_en": "ENPPI SC",
    "name_ar": "إنبي",
    "short_name": "ENP",
    "logo": "assets/logos/enppi.png"
  },
  {
    "id": "egy_008",
    "name_en": "ZED FC",
    "name_ar": "زد",
    "short_name": "ZED",
    "logo": "assets/logos/zed.png"
  },
  {
    "id": "egy_009",
    "name_en": "National Bank of Egypt SC",
    "name_ar": "البنك الأهلي",
    "short_name": "NBE",
    "logo": "assets/logos/national_bank.png"
  },
  {
    "id": "egy_010",
    "name_en": "El Gouna FC",
    "name_ar": "الجونة",
    "short_name": "GOU",
    "logo": "assets/logos/el_gouna.png"
  },
  {
    "id": "egy_011",
    "name_en": "Petrojet FC",
    "name_ar": "بتروجيت",
    "short_name": "PET",
    "logo": "assets/logos/petrojet.png"
  },
  {
    "id": "egy_012",
    "name_en": "Modern Sport FC",
    "name_ar": "مودرن سبورت",
    "short_name": "MDS",
    "logo": "assets/logos/modern_sport.png"
  },
  {
    "id": "egy_013",
    "name_en": "Tala'ea El Gaish SC",
    "name_ar": "طلائع الجيش",
    "short_name": "GEI",
    "logo": "assets/logos/talaea_el_gaish.png"
  },
  {
    "id": "egy_014",
    "name_en": "Al Ittihad Alexandria SC",
    "name_ar": "الاتحاد السكندري",
    "short_name": "ITD",
    "logo": "assets/logos/al_ittihad.png"
  },
  {
    "id": "egy_015",
    "name_en": "Ghazl El Mahalla SC",
    "name_ar": "غزل المحلة",
    "short_name": "GHA",
    "logo": "assets/logos/ghazl_el_mahalla.png"
  },
  {
    "id": "egy_016",
    "name_en": "Wadi Degla SC",
    "name_ar": "وادي دجلة",
    "short_name": "WAD",
    "logo": "assets/logos/wadi_degla.png"
  },
  {
    "id": "egy_017",
    "name_en": "Al Mokawloon Al Arab SC",
    "name_ar": "المقاولون العرب",
    "short_name": "MOK",
    "logo": "assets/logos/al_mokawloon.png"
  },
  {
    "id": "egy_018",
    "name_en": "El Qanah FC",
    "name_ar": "القناة",
    "short_name": "QAN",
    "logo": "assets/logos/el_qanah.png"
  },
  {
    "id": "egy_019",
    "name_en": "Assiut Petroleum FC",
    "name_ar": "بترول أسيوط",
    "short_name": "PET-AS",
    "logo": "assets/logos/assiut_petroleum.png"
  },
  {
    "id": "egy_020",
    "name_en": "Abu Qir Fertilizers SC",
    "name_ar": "أبو قير للأسمدة",
    "short_name": "ABQ",
    "logo": "assets/logos/abu_qir_fertilizers.png"
  }
];

async function main() {
  console.log('Start seeding ...');
  
  for (const team of rawTeams) {
    // بناء الرابط الجديد بناء على مثالك وافتراض أن الصيغة كلها svg
    let newLogoUrl = team.logo
      .replace('assets/logos/', 'https://el-fantasy.s3.eu-north-1.amazonaws.com/')
      .replace('.png', '.svg');
      
    // تطبيق استثناء لاسم الأهلي كما في مثالك (ahly.svg بدلاً من al_ahly.svg)
    if (newLogoUrl.includes('al_ahly.svg')) {
      newLogoUrl = newLogoUrl.replace('al_ahly.svg', 'ahly.svg');
    }
      
    const teamData = {
      id: team.id,
      nameEn: team.name_en,
      nameAr: team.name_ar,
      shortName: team.short_name,
      logo: newLogoUrl
    };

    const teamRecord = await prisma.team.upsert({
      where: { id: teamData.id },
      update: teamData,
      create: teamData,
    });
    console.log(`Upserted team with id: ${teamRecord.id} and logo: ${teamRecord.logo}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
