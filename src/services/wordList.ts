export const TARGET_WORDS: string[] = [
    'TERMO', 'LIVRO', 'MAGIA', 'SAGAZ', 'NOBRE', 'PODER', 'TEMPO', 'MUNDO',
    'VIVER', 'PORTA', 'CORPO', 'FESTA', 'SOLAR', 'LUNAR', 'VENTO', 'AREIA',
    'FAROL', 'GRUPO', 'TURMA', 'VIOLA', 'PULGA', 'CHAVE', 'BRAVO', 'CORVO',
    'TREVO', 'PRATA', 'CANTO', 'PEDRA', 'FLORA', 'FAUNA', 'TERRA', 'ASTRO',
    'BRUXO', 'MAGOS', 'PACTO', 'ALMAS', 'RUNAS', 'CETRO', 'VAPOR', 'CALOR',
    'FROTA', 'NAVIO', 'FARDO', 'TREZE', 'NORTE', 'LISTA', 'GOLPE', 'SABER',
    'LINDO', 'GRAVE', 'DUELO', 'CREDO', 'POEMA', 'RITMO', 'VIGOR', 'SENDA',
    'HONRA', 'FUSÃO', 'ÓRFÃO', 'ÁUDIO', 'VÍDEO', 'FÁCIL', 'ÁVIDO', 'ÍMPAR',
    'ÉPICO', 'MÁGOA', 'NÉVOA', 'ÍCONE', 'ÊXITO', 'ÂMBAR', 'ÁGAPE', 'PLANO'
];

export const VALID_GUESSES: string[] = [
    ...TARGET_WORDS,
    'AÇÕES', 'ÁGUA', 'AJUDA', 'ALADO', 'ALFAS', 'ALGAS', 'ALTAR', 'ALTAS',
    'ALTOS', 'AMADA', 'AMADO', 'AMPLA', 'AMPLO', 'ANDAR', 'ANIMA', 'ANJOS',
    'ANTAS', 'ANTES', 'APELO', 'APICE', 'APOIO', 'APTOS', 'ARAME', 'ARCOS',
    'ARDOR', 'ARMAS', 'AROMA', 'ARTES', 'ASPAS', 'ATLAS', 'ATOAR', 'ATORES',
    'ATRAZ', 'AUDIP', 'AULAS', 'AURAS', 'AUTOR', 'AVARA', 'AVARO', 'AVIAO',
    'AVISO', 'AXIAL', 'AZUIS', 'BAILE', 'BAIXA', 'BAIXO', 'BALAS', 'BANCO',
    'BANDA', 'BANHO', 'BARCO', 'BARRA', 'BASES', 'BASTA', 'BEIJO', 'BELAS',
    'BELOS', 'BENTO', 'BICHO', 'BILHA', 'BLOCO', 'BOATO', 'BOMBA', 'BONDE',
    'BOSCO', 'BOTAS', 'BRAÇO', 'BRASA', 'BREVE', 'BRISA', 'BRUTO', 'BUCHA',
    'CABAL', 'CABOS', 'CAIXA', 'CALDO', 'CALMA', 'CALMO', 'CAMPO', 'CANAL',
    'CAPAZ', 'CARAS', 'CARGA', 'CARNE', 'CAROS', 'CARTA', 'CASAL', 'CASAS',
    'CASCA', 'CAUSA', 'CEDER', 'CELAS', 'CENAS', 'CERTO', 'CESAR', 'CESTO',
    'CHAPA', 'CHORO', 'CHUVA', 'CINCO', 'CINTO', 'CINZA', 'CIRCO', 'CISNE',
    'CIVIL', 'CLARA', 'CLARO', 'CLAVE', 'CLIMA', 'COBRA', 'COBRE', 'COFRES',
    'COISA', 'COLET', 'CONTO', 'CORDA', 'CORAL', 'COROA', 'COSTA', 'COUVE',
    'CRAVO', 'CRIME', 'CRISE', 'CRUEL', 'CULPA', 'CURTO', 'CURVA', 'DADOS',
    'DANÇA', 'DARDO', 'DEBIL', 'DEDOS', 'DENTE', 'DEUSA', 'DIETA', 'DIGNO',
    'DISCO', 'DIVAS', 'DOBRA', 'DOCES', 'DOGMA', 'DONOS', 'DOUTO', 'DRAMA',
    'DUPLA', 'DUPLO', 'DURAS', 'DUROS', 'ECOAR', 'EDITA', 'EGITO', 'ELITE',
    'ENTRE', 'ENVIO', 'ETAPA', 'ETICA', 'ETNIA', 'EVITA', 'EXATO', 'EXAME',
    'EXTRA', 'FADOS', 'FAIXA', 'FALAS', 'FALHA', 'FALTA', 'FARTO', 'FATAL',
    'FATOS', 'FEBRE', 'FEITO', 'FELIZ', 'FERAS', 'FERRO', 'FERVE', 'FIBRA',
    'FICHA', 'FILHO', 'FILME', 'FINAL', 'FINAS', 'FINOS', 'FIRME', 'FIXOS',
    'FOCOS', 'FOLHA', 'FORCA', 'FORÇA', 'FORMA', 'FORNO', 'FORTE', 'FOSSO',
    'FOTOS', 'FRACO', 'FRASE', 'FREIO', 'FRUTA', 'FRUTO', 'FUGIR', 'FUMOS',
    'FUNDO', 'FUNIL', 'FUROR', 'GARFO', 'GARRA', 'GASES', 'GASTO', 'GEADA',
    'GELOS', 'GEMAS', 'GENRO', 'GENTE', 'GERAL', 'GESTO', 'GIGAS', 'GIRAR',
    'GLOBO', 'GLOSA', 'GOMOS', 'GOTAS', 'GRADE', 'GRAUS', 'GRAXA', 'GRITO',
    'GRUDA', 'GUIAI', 'GUIAS', 'HARPA', 'HASTE', 'HEROI', 'HIFEN', 'HORAS',
    'HORDA', 'HOTEL', 'HUMOR', 'IDEAL', 'IDOSO', 'IGUAL', 'IMPAR', 'IMUNE',
    'INDIO', 'IRMAO', 'ISCAS', 'ITENS', 'JARRA', 'JATOS', 'JEITO', 'JOGOS',
    'JOIAS', 'JOVEM', 'JUROS', 'JUSTO', 'LABIA', 'LAÇOS', 'LADOS', 'LAGOS',
    'LAJES', 'LAMAS', 'LANÇA', 'LAPIS', 'LARGA', 'LARGO', 'LASCA', 'LATAS',
    'LAUDO', 'LAVAR', 'LEAIS', 'LEBRE', 'LEGAL', 'LEGUA', 'LEITE', 'LENTO',
    'LEÕES', 'LESTE', 'LEVAS', 'LILAS', 'LIMOI', 'LIMPA', 'LIMPO', 'LINFA',
    'LIRIO', 'LIVRE', 'LOBOS', 'LOCAL', 'LOGICA', 'LONGE', 'LOTES', 'LOUCO',
    'LOURO', 'LOUÇA', 'LUCRO', 'LUGAR', 'LUPAS', 'LUTAS', 'LUXOS', 'MACHO',
    'MACIO', 'MALAS', 'MALHA', 'MANHA', 'MANSO', 'MANTA', 'MARCA', 'MARTE',
    'MASSA', 'MATAS', 'MAÇOS', 'MEDIR', 'MEDOS', 'MEIAS', 'MEIOS', 'MELAO',
    'MENOR', 'MENOS', 'MENTE', 'METAS', 'METRO', 'MIOLO', 'MISSA', 'MISTO',
    'MITOS', 'MODAS', 'MODOS', 'MOEDA', 'MOLDE', 'MOLHO', 'MONTE', 'MORAL',
    'MORRO', 'MORTE', 'MOTOR', 'MUITO', 'MULTO', 'MUROS', 'MUSEU', 'MUTUO',
    'NINHO', 'NOITE', 'NOTAS', 'NOVOS', 'NUVEM', 'OLHOS', 'ONZES', 'OPÇÃO',
    'ORDEM', 'OSSOS', 'OUTRO', 'OUVID', 'PADRE', 'PAGAR', 'PAINE', 'PALCO',
    'PALHA', 'PALMA', 'PANOS', 'PARDO', 'PARES', 'PARTE', 'PASSO', 'PASTA',
    'PATOS', 'PAUSA', 'PEIXE', 'PELOS', 'PENAS', 'PERDA', 'PERTO', 'PESOS',
    'PIANO', 'PILHA', 'PINOS', 'PINTA', 'PINTO', 'PISTA', 'PIZZA', 'PLACA',
    'PLUMA', 'POBRE', 'POÇOS', 'PONTA', 'PONTO', 'PORCO', 'PORTO', 'POSTO',
    'POTES', 'POUCO', 'POUSO', 'PRAIA', 'PRATO', 'PRAZO', 'PREÇO', 'PREGO',
    'PRETO', 'PRIMA', 'PRIMO', 'PROSA', 'PROVA', 'PUDOR', 'PULSO', 'PUNHO',
    'PURAO', 'PUROS', 'QUAIS', 'QUASE', 'QUEDA', 'QUEI', 'QUERO', 'QUILO',
    'QUINA', 'RAMOS', 'RANGO', 'RAPAZ', 'RAROS', 'RASGO', 'RAZÃO', 'REGRA',
    'REINO', 'RELOG', 'RESTO', 'RETRO', 'REVER', 'REZAR', 'RIFAS', 'ROBOT',
    'ROCHA', 'RODAS', 'ROJÃO', 'ROSTO', 'ROTAS', 'ROUBO', 'ROUPA', 'RUDEZ',
    'RUGBY', 'RUÍDO', 'RUÍNA', 'SABÃO', 'SABOR', 'SABRE', 'SACOS', 'SALDO',
    'SALÃO', 'SALTO', 'SAMBA', 'SANTO', 'SAPOS', 'SAQUE', 'SARAU', 'SAÚDE',
    'SECOS', 'SEDES', 'SELOS', 'SENSO', 'SERRA', 'SERVO', 'SESTO', 'SETAS',
    'SETOR', 'SEXTO', 'SILVA', 'SINAL', 'SINOS', 'SITIO', 'SOBRA', 'SÓCIO',
    'SOFÁS', 'SOLOS', 'SOMAR', 'SONHO', 'SONOS', 'SOPAS', 'SORTE', 'SOUZA',
    'SUAVE', 'SUBIR', 'SUCES', 'SUJOS', 'SUMIR', 'SURDO', 'SUTIL', 'TABUA',
    'TALHO', 'TAMPO', 'TANTÍ', 'TANTO', 'TARDE', 'TAXAS', 'TECLA', 'TELAS',
    'TELHA', 'TEMOR', 'TERÇO', 'TERNO', 'TESTE', 'TETOS', 'TIÇÃO', 'TIGRE',
    'TIJOL', 'TIMAO', 'TINTA', 'TINTO', 'TIPOS', 'TIRAS', 'TIROS', 'TOCAR',
    'TODAS', 'TODOS', 'TOMAR', 'TONEL', 'TONTO', 'TOPAR', 'TOQUE', 'TORRE',
    'TORTA', 'TORTO', 'TRAÇO', 'TRAJE', 'TRAMA', 'TRAPO', 'TRATO', 'TRENO',
    'TRIGO', 'TRONO', 'TROPA', 'TRUCO', 'TUBOS', 'TURBO', 'TURNO', 'ULTRA',
    'UNIÃO', 'ÚNICO', 'URINA', 'URNAS', 'URTIG', 'URUBI', 'USINA', 'USUAL',
    'VAGAS', 'VAGÃO', 'VAGOS', 'VALAS', 'VALES', 'VALOR', 'VALSA', 'VARAS',
    'VASOS', 'VASTO', 'VEIAS', 'VELAS', 'VELHO', 'VELOZ', 'VENDA', 'VERBO',
    'VERDE', 'VERSO', 'VESTE', 'VEZES', 'VIAJAR', 'VILAS', 'VINHO', 'VINTE',
    'VIRAL', 'VISÃO', 'VISTA', 'VISTO', 'VITAIS', 'VOTOS', 'VOZES', 'ZEBRA',
    'ZEROS', 'ZINCO', 'ZUMBI'
];

export const normalizeWord = (word: string): string => {
    return word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
};

const VALID_NORMALIZED_SET = new Set(VALID_GUESSES.map(normalizeWord));

export const isValidWord = (word: string): boolean => {
    return VALID_NORMALIZED_SET.has(normalizeWord(word));
};

export const getOriginalSpelling = (normalized: string): string => {
    const match = VALID_GUESSES.find((w) => normalizeWord(w) === normalized);
    return match || normalized;
};