import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, RotateCcw, FileCheck, Lock, ShieldCheck, Plus, Trash2, KeyRound, LogOut, BookOpen } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────
// LIGAÇÃO AO SUPABASE
// Substitua os dois valores abaixo pelos que encontrar em:
// Supabase → o seu projeto → Settings → API
// ─────────────────────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─────────────────────────────────────────────────────────────────────────
// DADOS: bancos de questões
// Cada exame tem uma ou mais "disciplinas". Cada disciplina tem a sua
// própria lista de questões. Para acrescentar questões, basta inserir
// mais objetos dentro do array "questoes" da disciplina correspondente.
// ─────────────────────────────────────────────────────────────────────────

const EXAMS = [
  {
    id: "minint",
    codigo: "MININT-01",
    titulo: "Ministério do Interior",
    subtitulo: "Escolha a área: PNA, SIC, SME, Serviço Prisional ou Proteção Civil e Bombeiros",
    accent: "#A23E2E",
    disciplinas: [
      { id: "pna", nome: "PNA (Polícia Nacional de Angola)", questoes: [
        {"enunciado":"O Reino do Kongo, um dos mais importantes reinos que existiram no atual território angolano antes da colonização, tinha a sua área de influência situada principalmente:","opcoes":["No sul de Angola, junto ao deserto do Namibe","No norte de Angola, estendendo-se também pelo atual território da RD Congo","No planalto central, junto ao Huambo","Apenas nas ilhas costeiras"],"correta":1,"explicacao":"O Reino do Kongo situava-se principalmente no norte do atual território angolano, estendendo-se também pela RD Congo."},
        {"enunciado":"A Rainha Njinga Mbandi (Rainha Ginga) é historicamente reconhecida por:","opcoes":["Ter colaborado sem resistência com o poder colonial","Ter liderado uma forte resistência aos colonizadores portugueses no século XVII","Ser uma figura exclusivamente lendária, sem existência histórica","Ter fundado a cidade de Luanda"],"correta":1,"explicacao":"A Rainha Njinga Mbandi liderou uma notável resistência política e militar à colonização portuguesa no século XVII."},
        {"enunciado":"A cidade de Luanda foi fundada pelos portugueses no ano de:","opcoes":["1482","1575","1650","1700"],"correta":1,"explicacao":"Luanda foi fundada em 1575 por Paulo Dias de Novais, tornando-se mais tarde a capital de Angola."},
        {"enunciado":"O navegador português que primeiro chegou à foz do rio Congo, em 1482, iniciando o contacto entre Portugal e os reinos da região, foi:","opcoes":["Vasco da Gama","Diogo Cão","Bartolomeu Dias","Pedro Álvares Cabral"],"correta":1,"explicacao":"Diogo Cão chegou à foz do rio Congo em 1482, estabelecendo os primeiros contactos entre Portugal e o Reino do Kongo."},
        {"enunciado":"O dia 4 de fevereiro de 1961 é historicamente assinalado em Angola como:","opcoes":["A data da independência nacional","O início da luta armada de libertação nacional","A assinatura dos Acordos de Bicesse","O fim da guerra civil"],"correta":1,"explicacao":"A 4 de fevereiro de 1961 é habitualmente assinalada como o início da luta armada de libertação nacional em Angola."},
        {"enunciado":"Os três principais movimentos de libertação nacional que lutaram pela independência de Angola foram:","opcoes":["MPLA, FNLA e UNITA","PAIGC, FRELIMO e MPLA","ANC, SWAPO e ZANU","FLEC, UNITA e PAIGC"],"correta":0,"explicacao":"MPLA, FNLA e UNITA foram os três principais movimentos que conduziram a luta de libertação nacional angolana."},
        {"enunciado":"A independência de Angola foi proclamada em Luanda, a 11 de novembro de 1975, tendo como primeiro Presidente:","opcoes":["José Eduardo dos Santos","Agostinho Neto","Jonas Savimbi","Holden Roberto"],"correta":1,"explicacao":"Agostinho Neto tornou-se o primeiro Presidente da República Popular de Angola após a independência em 1975."},
        {"enunciado":"A guerra civil angolana, que se seguiu à independência, prolongou-se, com interrupções, desde 1975 até:","opcoes":["1991, com os Acordos de Bicesse","2002, com a morte de Jonas Savimbi","1980","2010, com a nova Constituição"],"correta":1,"explicacao":"A guerra civil, com breves interrupções, prolongou-se até 2002, terminando após a morte de Jonas Savimbi."},
        {"enunciado":"O Memorando de Entendimento que pôs fim à guerra civil angolana foi assinado a 4 de abril de:","opcoes":["1991","2002","1994","1975"],"correta":1,"explicacao":"O Memorando de Entendimento, que consolidou o cessar-fogo definitivo, foi assinado a 4 de abril de 2002."},
        {"enunciado":"Os Acordos de Bicesse, assinados em Portugal em 1991, tinham como principal objetivo:","opcoes":["Formalizar a independência de Angola","Estabelecer um processo de paz e eleições multipartidárias entre o Governo e a UNITA","Criar a moeda nacional angolana","Definir as fronteiras com a Namíbia"],"correta":1,"explicacao":"Os Acordos de Bicesse estabeleceram um processo de paz e a realização de eleições multipartidárias em Angola."},
        {"enunciado":"A Polícia Nacional de Angola (PNA) subordina-se organicamente a que órgão?","opcoes":["Ministério da Defesa Nacional","Ministério do Interior","Presidência da República","Ministério da Justiça"],"correta":1,"explicacao":"A PNA é um dos corpos subordinados ao Ministério do Interior, responsável pela ordem, segurança e tranquilidade pública."},
        {"enunciado":"A missão institucional primordial do Ministério do Interior é:","opcoes":["Gerir a política externa do país","Garantir a ordem, segurança e tranquilidade públicas e a administração do território","Administrar bancos estatais","Coordenar acordos comerciais internacionais"],"correta":1,"explicacao":"O MININT assegura a ordem interna, a segurança pública e a administração territorial do país."},
        {"enunciado":"A Direcção Nacional de Trânsito, no âmbito do MININT, ocupa-se principalmente de:","opcoes":["Fiscalização bancária","Regulação, fiscalização e segurança da circulação rodoviária","Emissão de passaportes","Gestão de fronteiras marítimas"],"correta":1,"explicacao":"A área de trânsito no MININT trata da regulação e fiscalização da circulação rodoviária."},
        {"enunciado":"O uso da força pela polícia deve, por princípio, obedecer a critérios de:","opcoes":["Arbitrariedade total","Proporcionalidade, necessidade e legalidade","Ausência de qualquer regra","Decisão exclusivamente pessoal do agente"],"correta":1,"explicacao":"O uso da força policial é regido pelos princípios da legalidade, necessidade e proporcionalidade."},
        {"enunciado":"A hierarquia policial, em regra, assenta no princípio de:","opcoes":["Ausência total de hierarquia","Subordinação e disciplina, com cadeia de comando definida","Decisão coletiva sem chefias","Rotatividade diária de comando"],"correta":1,"explicacao":"As forças policiais organizam-se hierarquicamente, com disciplina e cadeia de comando bem definidas."}
      ]},
      { id: "sic", nome: "SIC (Serviço de Investigação Criminal)", questoes: [
        {"enunciado":"Angola está atualmente dividida, em termos de organização político-administrativa, em quantas províncias?","opcoes":["15","18","21","24"],"correta":2,"explicacao":"Desde 1 de janeiro de 2025 (Lei n.º 14/24), Angola passou de 18 para 21 províncias, cada uma chefiada por um governador provincial."},
        {"enunciado":"A hierarquia da divisão político-administrativa de Angola segue, em regra, a ordem:","opcoes":["Município, província, comuna","Província, município, comuna","Comuna, província, município","Distrito, região, província"],"correta":1,"explicacao":"A organização territorial angolana estrutura-se, em regra, em províncias, que se subdividem em municípios e estes em comunas."},
        {"enunciado":"Angola é, segundo a sua Constituição, um Estado organizado sob a forma de:","opcoes":["Monarquia constitucional","República, com sistema de governo presidencialista","Confederação de províncias autónomas","Protetorado"],"correta":1,"explicacao":"Angola é uma República, com um sistema de governo presidencialista, segundo a Constituição de 2010."},
        {"enunciado":"O órgão que exerce a função legislativa em Angola, ao nível nacional, é:","opcoes":["O Conselho de Ministros","A Assembleia Nacional","O Tribunal Supremo","O Governo Provincial"],"correta":1,"explicacao":"A Assembleia Nacional, órgão unicameral, exerce a função legislativa a nível nacional em Angola."},
        {"enunciado":"O Governador Provincial, enquanto representante do poder central numa província angolana, é:","opcoes":["Eleito diretamente pelos cidadãos da província","Nomeado pelo Presidente da República","Escolhido pelo Tribunal Supremo","Designado pela Assembleia Nacional apenas"],"correta":1,"explicacao":"O Governador Provincial é nomeado pelo Presidente da República, representando o poder central na província."},
        {"enunciado":"A atual Constituição da República de Angola foi aprovada no ano de:","opcoes":["1975","1992","2002","2010"],"correta":3,"explicacao":"A Constituição da República de Angola atualmente em vigor foi aprovada em 2010."},
        {"enunciado":"A cidade de Luanda, além de ser a capital de Angola, tem também o estatuto de:","opcoes":["Uma das 21 províncias do país","Um território autónomo fora da divisão provincial","Uma comuna isolada","Um município estrangeiro"],"correta":0,"explicacao":"Luanda, além de capital do país, constitui também uma das 21 províncias de Angola (com sede no município da Ingombota, desde a reforma de 2025)."},
        {"enunciado":"A administração municipal em Angola é, em regra, chefiada por um(a):","opcoes":["Governador provincial","Administrador municipal","Juiz presidente","Comandante policial"],"correta":1,"explicacao":"A administração ao nível do município é chefiada por um administrador municipal, subordinado hierarquicamente ao governador provincial."},
        {"enunciado":"A Lei n.º 14/24, que reformou a divisão político-administrativa de Angola em vigor desde janeiro de 2025, criou três novas províncias por divisão de territórios já existentes. São elas:","opcoes":["Bengo, Cunene e Namibe","Ícolo e Bengo, Cuando e Moxico Leste","Huíla, Malanje e Uíge","Cabinda, Zaire e Benguela"],"correta":1,"explicacao":"As três novas províncias resultaram da divisão de Luanda (Ícolo e Bengo), Cuando Cubango (Cuando) e Moxico (Moxico Leste)."},
        {"enunciado":"O poder judicial em Angola tem, no topo da sua estrutura hierárquica, o(a):","opcoes":["Assembleia Nacional","Tribunal Supremo","Governo Provincial","Ministério do Interior"],"correta":1,"explicacao":"O Tribunal Supremo situa-se no topo da hierarquia dos tribunais judiciais em Angola."},
        {"enunciado":"O Serviço de Investigação Criminal (SIC) tem como principal atribuição:","opcoes":["Fiscalização aduaneira","Investigação de crimes e coadjuvação do Ministério Público","Emissão de vistos","Gestão penitenciária"],"correta":1,"explicacao":"O SIC investiga crimes e presta apoio ao Ministério Público na fase de instrução criminal."}
      ]},
      { id: "sme", nome: "SME (Serviço de Migração e Estrangeiros)", questoes: [
        {"enunciado":"A distinção entre 'funcionário público' e 'agente administrativo' assenta principalmente na:","opcoes":["Cor do uniforme utilizado","Natureza e estabilidade do vínculo jurídico-laboral com a Administração","Localização geográfica do serviço","Idade do trabalhador"],"correta":1,"explicacao":"O funcionário público tem vínculo definitivo e estatutário; o agente administrativo tem vínculo geralmente menos estável."},
        {"enunciado":"O 'destacamento' de um funcionário público caracteriza-se por:","opcoes":["Cessação definitiva do vínculo laboral","Deslocação temporária para outro serviço, mantendo o vínculo de origem","Promoção automática de categoria","Aposentação antecipada"],"correta":1,"explicacao":"O destacamento é uma situação temporária: o funcionário mantém o vínculo com o serviço de origem."},
        {"enunciado":"A 'nomeação em comissão de serviço' na Administração Pública distingue-se da nomeação definitiva por:","opcoes":["Ser sempre vitalícia","Ter carácter temporário, associado a um cargo de direção ou de confiança","Não exigir quaisquer habilitações","Ser exclusiva do sector privado"],"correta":1,"explicacao":"A comissão de serviço é temporária, ligada ao exercício de um cargo de direção ou de confiança política/técnica."},
        {"enunciado":"O princípio da 'hierarquia administrativa' pressupõe que:","opcoes":["Todos os funcionários têm exatamente o mesmo poder de decisão","Existe uma relação de subordinação entre órgãos e agentes, com poder de direção e dever de obediência","Não há qualquer relação de subordinação na Administração Pública","Apenas se aplica às Forças Armadas"],"correta":1,"explicacao":"A hierarquia administrativa implica uma cadeia de subordinação, com poder de direção do superior e dever de obediência do subalterno."},
        {"enunciado":"Um 'ato administrativo' caracteriza-se, tipicamente, por ser:","opcoes":["Sempre um contrato entre dois particulares","Uma decisão unilateral de um órgão da Administração, no exercício de poderes públicos, com efeitos jurídicos","Um documento sem qualquer valor legal","Exclusivo do poder legislativo"],"correta":1,"explicacao":"O ato administrativo é uma decisão unilateral da Administração, no exercício de poderes públicos, produzindo efeitos jurídicos."},
        {"enunciado":"O crime de 'prevaricação' no exercício de funções públicas consiste em:","opcoes":["Cumprir rigorosamente as normas legais","Retardar ou omitir ato devido, ou praticá-lo contra a lei, para satisfazer interesse próprio","Recusar uma promoção oferecida","Faltar uma vez ao serviço, justificadamente"],"correta":1,"explicacao":"Prevaricação é a violação consciente do dever funcional para favorecer interesse próprio ou de terceiro."},
        {"enunciado":"O princípio da 'boa administração' impõe à Administração Pública, entre outros, o dever de:","opcoes":["Agir de forma arbitrária, sem qualquer critério","Atuar de forma eficiente, transparente e orientada para o interesse público","Priorizar sempre interesses privados","Ignorar as necessidades dos cidadãos"],"correta":1,"explicacao":"O princípio da boa administração exige eficiência, transparência e orientação para a prossecução do interesse público."},
        {"enunciado":"O Serviço de Migração e Estrangeiros (SME) foi criado com a função principal de:","opcoes":["Controlar o trânsito rodoviário","Regular a entrada, permanência e saída de estrangeiros do território nacional","Fiscalizar o comércio informal","Gerir arquivos notariais"],"correta":1,"explicacao":"O SME controla os fluxos migratórios, emissão de vistos e situação documental de estrangeiros em Angola."}
      ]},
      { id: "prisional", nome: "Serviço Prisional", questoes: [
        {"enunciado":"O 'patriotismo', enquanto valor cívico, pode ser definido como:","opcoes":["Rejeição de qualquer outra cultura ou nação","Amor, respeito e sentido de responsabilidade para com a própria pátria e os seus valores","Obediência cega a qualquer governo","Um sentimento sem qualquer expressão prática"],"correta":1,"explicacao":"O patriotismo traduz-se no amor, respeito e sentido de responsabilidade cívica para com a pátria e os seus valores."},
        {"enunciado":"O Hino Nacional de Angola tem como título:","opcoes":["Angola Avante","Terra Adorada","Pátria Amada","Hino da Liberdade"],"correta":0,"explicacao":"'Angola Avante' é o título do Hino Nacional da República de Angola."},
        {"enunciado":"A Bandeira Nacional de Angola é composta, na sua base, pelas cores:","opcoes":["Verde e amarelo","Vermelho e preto","Azul e branco","Laranja e cinzento"],"correta":1,"explicacao":"A bandeira nacional angolana é composta por duas faixas horizontais, vermelha e preta, com um emblema ao centro."},
        {"enunciado":"O 17 de setembro é assinalado em Angola como o Dia:","opcoes":["Da Independência Nacional","dos Heróis Nacionais, coincidindo com o nascimento de Agostinho Neto","Da Juventude","Das Forças Armadas"],"correta":1,"explicacao":"O 17 de setembro assinala o Dia dos Heróis Nacionais, data de nascimento de Agostinho Neto."},
        {"enunciado":"Agostinho Neto é oficialmente reconhecido em Angola pelo título de:","opcoes":["Herói Nacional","Simples cidadão comum","Governador Provincial","Nenhum título especial"],"correta":0,"explicacao":"Agostinho Neto é reconhecido oficialmente como Herói Nacional de Angola."},
        {"enunciado":"Os símbolos nacionais de um país incluem tipicamente:","opcoes":["Apenas a moeda nacional","A bandeira, o hino nacional e o brasão de armas","Apenas o nome do chefe de Estado","Somente as fronteiras territoriais"],"correta":1,"explicacao":"Os principais símbolos nacionais de um Estado são, tipicamente, a bandeira, o hino nacional e o brasão de armas."},
        {"enunciado":"O respeito pelos símbolos nacionais (bandeira, hino) é geralmente entendido como uma expressão de:","opcoes":["Uma imposição sem qualquer significado","Civismo e patriotismo, enquanto reconhecimento da identidade e soberania nacional","Um costume exclusivamente militar","Uma obrigação apenas para funcionários públicos"],"correta":1,"explicacao":"O respeito pelos símbolos nacionais expressa civismo e reconhecimento da identidade e soberania do país."},
        {"enunciado":"A educação cívica e o ensino da história nacional nas escolas contribuem, entre outros objetivos, para:","opcoes":["Apagar a memória histórica do país","Fortalecer o sentido de identidade e pertença nacional dos cidadãos","Substituir totalmente outras disciplinas","Não ter qualquer relevância social"],"correta":1,"explicacao":"A educação cívica e histórica fortalece o sentido de identidade e pertença nacional, base do patriotismo."},
        {"enunciado":"O Serviço Prisional integra o MININT com a responsabilidade de:","opcoes":["Administrar hospitais públicos","Gerir os estabelecimentos prisionais e a execução de penas privativas de liberdade","Fiscalizar eleições","Emitir bilhetes de identidade"],"correta":1,"explicacao":"O Serviço Prisional gere os estabelecimentos penitenciários do país e a execução de penas privativas de liberdade."}
      ]},
      { id: "bombeiros", nome: "Proteção Civil e Bombeiros", questoes: [
        {"enunciado":"O serviço militar e outras formas de serviço à comunidade são, tradicionalmente, associados ao valor do:","opcoes":["Individualismo extremo","Patriotismo e sentido de dever para com a pátria","Desinteresse pela vida coletiva","Isolamento social"],"correta":1,"explicacao":"O serviço à comunidade e à nação é tradicionalmente associado ao patriotismo e ao dever cívico."},
        {"enunciado":"A defesa da soberania e da integridade territorial de um país é, constitucionalmente, um dever que recai, entre outros, sobre:","opcoes":["Nenhuma entidade em particular","O Estado e, em certa medida, todos os cidadãos, nos termos da lei","Apenas organizações internacionais","Exclusivamente empresas privadas"],"correta":1,"explicacao":"A defesa da soberania e integridade territorial constitui dever do Estado, envolvendo também os cidadãos nos termos legais."},
        {"enunciado":"A valorização da história e cultura nacionais, como parte da identidade angolana, reflete-se, entre outros aspetos, em:","opcoes":["Rejeição de qualquer património cultural","Preservação de línguas nacionais, tradições e datas históricas comemorativas","Apagamento deliberado da memória colonial e pós-colonial","Ausência de qualquer política cultural"],"correta":1,"explicacao":"A valorização da identidade nacional reflete-se na preservação das línguas, tradições e datas históricas do país."},
        {"enunciado":"A pasta do Ministério do Interior de Angola foi criada em:","opcoes":["11 de novembro de 1975","15 de janeiro de 1975","4 de fevereiro de 1961","1 de agosto de 1979"],"correta":1,"explicacao":"A pasta do Ministério do Interior foi criada em 15 de janeiro de 1975, ainda no período do Governo de Transição estabelecido pelo Acordo do Alvor."},
        {"enunciado":"O primeiro ministro a liderar a pasta do Interior em Angola, em 1975, foi:","opcoes":["Ngola Kabangu","Agostinho Neto","Nito Alves","Kundi Paihama"],"correta":0,"explicacao":"Ngola Kabangu foi o primeiro ministro a liderar a pasta do Interior, criada em janeiro de 1975."},
        {"enunciado":"Entre 1980 e 1989, o Ministério do Interior de Angola foi liderado por:","opcoes":["Kundi Paihama","Alexandre Kito","Santana Petroff","Roberto Ngongo"],"correta":1,"explicacao":"Alexandre Kito liderou o Ministério do Interior num primeiro período (1978-1979) e depois novamente entre 1980 e 1989."},
        {"enunciado":"Fernando da Piedade Dias dos Santos, mais tarde Primeiro-Ministro de Angola, liderou o Ministério do Interior no período de:","opcoes":["1989-1992","1997-2002","2006-2010","2012-2019"],"correta":1,"explicacao":"Fernando da Piedade Dias dos Santos liderou o Ministério do Interior entre 1997 e 2002, antes de assumir a chefia do Governo."},
        {"enunciado":"O atual Ministro do Interior de Angola, em funções desde 2024, é:","opcoes":["Eugénio César Laborinho","Ângelo Veiga Tavares","Manuel Gomes da Conceição Homem","Osvaldo Van-Dúnem"],"correta":2,"explicacao":"Manuel Gomes da Conceição Homem assumiu a pasta do Interior em 2024, sucedendo a Eugénio César Laborinho."},
        {"enunciado":"Eugénio César Laborinho liderou o Ministério do Interior de Angola no período de:","opcoes":["2002-2006","2010-2012","2019-2024","1992-1997"],"correta":2,"explicacao":"Eugénio César Laborinho foi Ministro do Interior entre 2019 e 2024, antecedendo Manuel Gomes da Conceição Homem."},
        {"enunciado":"O Corpo de Bombeiros em Angola subordina-se, para efeitos de proteção civil, a:","opcoes":["Ministério da Saúde","Ministério do Interior","Ministério das Finanças","Ministério da Cultura"],"correta":1,"explicacao":"A proteção civil e o corpo de bombeiros integram-se na estrutura do Ministério do Interior."}
      ]}
    ]
  },
{
    id: "inej",
    codigo: "INEJ-01",
    titulo: "INEJ — Estudos Judiciários",
    subtitulo: "Fases do concurso e organização judiciária",
    accent: "#1B2A4A",
    disciplinas: [
      { id: "geral", nome: "Geral", questoes: [
        { enunciado: "O concurso de acesso ao INEJ é normalmente composto por quantas fases eliminatórias?", opcoes: ["Duas", "Três", "Quatro", "Cinco"], correta: 2, explicacao: "O processo segue habitualmente quatro fases: candidatura/admissão, provas escritas, provas físicas/psicotécnicas e entrevista." },
        { enunciado: "O INEJ tem como principal missão institucional:", opcoes: ["Formar magistrados judiciais e do Ministério Público", "Fiscalizar bancos comerciais", "Administrar o sistema prisional", "Regular telecomunicações"], correta: 0, explicacao: "O Instituto Nacional de Estudos Judiciários forma e prepara magistrados judiciais e do Ministério Público." },
        { enunciado: "No princípio 'in dubio pro reo', em caso de dúvida sobre a culpa do arguido, o tribunal deve:", opcoes: ["Absolver o arguido", "Condenar por precaução", "Suspender o processo indefinidamente", "Aplicar a pena mínima automaticamente"], correta: 0, explicacao: "Havendo dúvida razoável, decide-se a favor do arguido — absolvição." },
        { enunciado: "O 'habeas corpus' é um instrumento processual que visa principalmente:", opcoes: ["Reaver bens penhorados", "Proteger a liberdade de locomoção contra prisão ou detenção ilegal", "Anular contratos civis", "Impugnar decisões fiscais"], correta: 1, explicacao: "O habeas corpus protege o direito à liberdade contra prisões ou detenções ilegais ou abusivas." },
        { enunciado: "A expressão latina 'dura lex sed lex' traduz o princípio de que:", opcoes: ["A lei deve ser sempre interpretada com clemência", "A lei é dura, mas é a lei — deve ser cumprida mesmo quando rigorosa", "Só os juízes podem criar leis", "As leis antigas prevalecem sobre as recentes"], correta: 1, explicacao: "Expressa a ideia de que, por mais rigorosa que seja, a lei deve ser aplicada e respeitada." },
        { enunciado: "O princípio 'nullum crimen, nulla poena sine lege' significa que:", opcoes: ["Qualquer conduta pode ser punida, mesmo sem lei prévia", "Não há crime nem pena sem lei anterior que os defina", "Apenas o costume pode definir crimes", "As penas podem ser aplicadas retroativamente sem limite"], correta: 1, explicacao: "Este princípio da legalidade penal exige lei prévia que defina o crime e a respetiva pena." },
        { enunciado: "A 'independência dos tribunais', enquanto princípio constitucional, significa que:", opcoes: ["Os juízes decidem sem qualquer fundamento legal", "Os tribunais decidem com base na lei, livres de pressões de outros poderes", "Os tribunais dependem diretamente do Governo", "Não existe qualquer controlo sobre as decisões judiciais"], correta: 1, explicacao: "A independência judicial garante que os tribunais decidam com base na lei, sem interferência de outros poderes do Estado." },
        { enunciado: "O 'princípio do juiz natural' garante que:", opcoes: ["Qualquer pessoa pode escolher livremente o seu juiz", "Ninguém pode ser julgado por tribunal criado especificamente após o facto, com poderes retroativos", "Os julgamentos podem ser feitos por qualquer cidadão", "Não existem regras sobre competência dos tribunais"], correta: 1, explicacao: "O princípio do juiz natural veda tribunais de exceção criados a posteriori para julgar factos já ocorridos." },
        { enunciado: "A distinção entre jurisdição 'cível' e 'criminal' assenta principalmente:", opcoes: ["No tipo de litígio — direitos e obrigações entre particulares versus responsabilidade penal por crimes", "No valor da causa apenas", "Na duração do processo", "Na nacionalidade das partes"], correta: 0, explicacao: "A jurisdição cível trata de litígios entre particulares (direitos e obrigações); a criminal, da responsabilidade penal por crimes." },
        { enunciado: "O 'Ministério Público' tem, entre as suas funções principais:", opcoes: ["Julgar e decidir processos", "Representar o Estado, promover a ação penal e defender a legalidade democrática", "Substituir o poder legislativo", "Administrar o sistema prisional"], correta: 1, explicacao: "O Ministério Público representa o Estado, promove a acção penal e vela pela legalidade democrática." },
        { enunciado: "A 'sentença' e o 'acórdão' distinguem-se essencialmente por:", opcoes: ["Serem termos idênticos em qualquer contexto", "A sentença é normalmente proferida por um juiz singular; o acórdão, por um tribunal colegial", "O acórdão só existe em processos civis", "A sentença nunca pode ser objeto de recurso"], correta: 1, explicacao: "Em regra, sentença é a decisão de juiz singular; acórdão é a decisão de um tribunal coletivo (colegial)." },
        { enunciado: "O 'recurso' de uma decisão judicial serve fundamentalmente para:", opcoes: ["Anular automaticamente qualquer processo", "Permitir a reapreciação da decisão por uma instância superior", "Substituir a fase de instrução", "Ser aplicável apenas em processos administrativos"], correta: 1, explicacao: "O recurso permite que uma instância superior reaprecie a decisão tomada, corrigindo eventuais erros." },
        { enunciado: "O 'trânsito em julgado' de uma decisão judicial significa que:", opcoes: ["A decisão ainda pode ser livremente alterada por qualquer parte", "A decisão se tornou definitiva, por já não admitir recurso ordinário", "O processo foi arquivado sem decisão", "A decisão só produz efeitos no ano seguinte"], correta: 1, explicacao: "O trânsito em julgado ocorre quando a decisão se torna definitiva, esgotadas ou não usadas as possibilidades de recurso ordinário." },
        { enunciado: "A 'competência territorial' de um tribunal define-se, em regra, por:", opcoes: ["A vontade exclusiva do autor da ação", "Critérios legais como o local do facto, do domicílio das partes ou da situação do bem", "Sorteio aleatório sem qualquer critério", "A nacionalidade do juiz"], correta: 1, explicacao: "A competência territorial é fixada por critérios legais, como o local do facto ou domicílio das partes." },
        { enunciado: "O 'princípio da publicidade' dos julgamentos determina que, em regra:", opcoes: ["Os julgamentos devem ser sempre secretos", "Os atos processuais e julgamentos são públicos, salvo exceções legalmente previstas", "Só as partes podem assistir ao julgamento", "A imprensa está sempre proibida de assistir"], correta: 1, explicacao: "A regra geral é a publicidade dos atos judiciais, com exceções previstas na lei (ex: proteção de menores)." },
        { enunciado: "A 'prova testemunhal' distingue-se da 'prova documental' porque:", opcoes: ["São exatamente a mesma coisa", "A prova testemunhal assenta em depoimentos orais; a documental, em documentos escritos ou registados", "A prova testemunhal nunca é admissível em tribunal", "A prova documental é sempre mais fraca"], correta: 1, explicacao: "A prova testemunhal baseia-se em depoimentos; a documental, em documentos escritos ou registados apresentados ao processo." },
        { enunciado: "O 'ónus da prova' em processo penal recai, em regra, sobre:", opcoes: ["O arguido, que deve provar a sua inocência", "A acusação, que deve provar a culpa do arguido além de dúvida razoável", "O juiz, que deve provar tudo sozinho", "Nenhuma das partes"], correta: 1, explicacao: "Em processo penal, cabe à acusação provar a culpa do arguido, decorrência da presunção de inocência." },
        { enunciado: "A expressão 'pacta sunt servanda', do Direito Civil/Internacional, significa que:", opcoes: ["Os contratos podem ser livremente ignorados", "Os pactos (contratos/acordos) devem ser cumpridos pelas partes que os celebraram", "Apenas o Estado deve cumprir contratos", "Os contratos verbais nunca são válidos"], correta: 1, explicacao: "'Pacta sunt servanda' significa que os acordos celebrados devem ser cumpridos pelas partes." },
        { enunciado: "A 'capacidade jurídica' distingue-se da 'capacidade de exercício' porque:", opcoes: ["São sinónimos exatos", "A capacidade jurídica é a aptidão para ser titular de direitos; a de exercício, para os exercer pessoalmente", "A capacidade de exercício é sempre superior à jurídica", "Só existe capacidade jurídica para maiores de idade"], correta: 1, explicacao: "Capacidade jurídica é a aptidão para ser titular de direitos e obrigações; capacidade de exercício é a aptidão para os exercer pessoalmente." },
        { enunciado: "Um 'contrato' distingue-se de uma simples 'promessa social' porque:", opcoes: ["Não há qualquer diferença jurídica", "O contrato gera obrigações juridicamente vinculativas e exigíveis", "A promessa social é sempre mais forte juridicamente", "Contratos nunca podem ser verbais"], correta: 1, explicacao: "O contrato gera obrigações juridicamente vinculativas e exigíveis em tribunal, ao contrário de uma simples promessa social." },
        { enunciado: "A 'responsabilidade civil extracontratual' surge tipicamente quando:", opcoes: ["Há incumprimento de um contrato prévio entre as partes", "Alguém causa dano a outrem fora de qualquer relação contratual prévia, por ato ilícito e culposo", "Nunca há obrigação de indemnizar", "Apenas se aplica a empresas"], correta: 1, explicacao: "A responsabilidade extracontratual (aquiliana) resulta de dano causado fora de relação contratual prévia, por facto ilícito e culposo." },
        { enunciado: "O 'direito de propriedade' inclui, classicamente, os poderes de:", opcoes: ["Apenas usar o bem, sem mais nenhum poder", "Usar, fruir e dispor do bem, dentro dos limites da lei", "Apenas vender o bem", "Nenhum poder específico"], correta: 1, explicacao: "O direito de propriedade inclui classicamente os poderes de uso, fruição e disposição do bem, nos limites legais." },
        { enunciado: "O 'testamento' é, juridicamente, um ato:", opcoes: ["Bilateral, exigindo acordo de duas partes", "Unilateral, pelo qual uma pessoa dispõe dos seus bens para depois da morte", "Sem qualquer valor legal", "Apenas válido se feito oralmente"], correta: 1, explicacao: "O testamento é ato unilateral e revogável pelo qual uma pessoa dispõe, para depois da morte, dos seus bens." },
        { enunciado: "A 'usucapião', enquanto forma de aquisição de propriedade, baseia-se essencialmente:", opcoes: ["Na compra e venda formal do bem", "Na posse prolongada e contínua de um bem, nos termos e prazos previstos na lei", "Numa doação verbal simples", "Numa decisão arbitrária de um tribunal, sem requisitos"], correta: 1, explicacao: "A usucapião permite adquirir a propriedade através da posse contínua e prolongada, nos termos e prazos legalmente exigidos." },
        { enunciado: "O 'casamento', do ponto de vista jurídico, é geralmente definido como:", opcoes: ["Um mero acordo informal sem efeitos legais", "Um contrato/instituição que gera direitos e deveres recíprocos entre os cônjuges, regulado por lei", "Uma relação sem qualquer regulação jurídica", "Algo exclusivamente religioso, sem efeitos civis"], correta: 1, explicacao: "O casamento é regulado por lei e gera direitos e deveres recíprocos entre os cônjuges, com efeitos civis." },
        { enunciado: "O 'poder paternal' (responsabilidades parentais) tem como finalidade principal:", opcoes: ["Servir apenas os interesses dos pais", "Proteger e promover o superior interesse e bem-estar do filho menor", "Ser exercido sem qualquer limite legal", "Extinguir-se automaticamente aos 12 anos"], correta: 1, explicacao: "As responsabilidades parentais visam, primordialmente, proteger e promover o superior interesse do filho menor." },
        { enunciado: "A 'adopção', enquanto instituto jurídico, tem como objetivo essencial:", opcoes: ["Criar um vínculo exclusivamente económico", "Estabelecer um vínculo de filiação jurídica entre adoptante e adoptado, semelhante ao da filiação natural", "Ser um contrato temporário renovável anualmente", "Aplicar-se apenas a maiores de idade"], correta: 1, explicacao: "A adoção cria um vínculo jurídico de filiação equiparável, para efeitos legais, ao da filiação natural." },
        { enunciado: "O 'Direito do Trabalho' visa fundamentalmente regular:", opcoes: ["Relações entre Estados soberanos", "As relações entre empregadores e trabalhadores, incluindo direitos e deveres de ambas as partes", "Apenas o funcionamento de tribunais", "Exclusivamente o comércio internacional"], correta: 1, explicacao: "O Direito do Trabalho regula as relações laborais entre empregadores e trabalhadores." },
        { enunciado: "O 'despedimento sem justa causa' pode, em regra, dar origem a:", opcoes: ["Nenhuma consequência jurídica para o empregador", "Direito do trabalhador a indemnização ou reintegração, conforme a lei laboral aplicável", "Uma multa exclusivamente ao trabalhador", "Perda automática de todos os direitos do trabalhador"], correta: 1, explicacao: "O despedimento sem justa causa pode gerar direito a indemnização ou reintegração do trabalhador, conforme a lei laboral." },
        { enunciado: "A 'greve', enquanto direito dos trabalhadores, é geralmente reconhecida como:", opcoes: ["Uma conduta sempre ilegal em qualquer circunstância", "Um direito fundamental dos trabalhadores, exercido nos termos e limites previstos na lei", "Algo exclusivo de funcionários públicos", "Proibida em todos os países democráticos"], correta: 1, explicacao: "A greve é reconhecida como direito fundamental dos trabalhadores, sujeito a regras e limites legais." },
        { enunciado: "O 'Direito Comercial' regula, essencialmente, as relações jurídicas relacionadas com:", opcoes: ["Apenas o direito de família", "A atividade económica organizada e as relações entre comerciantes/empresas", "Exclusivamente o direito penal", "Apenas o direito constitucional"], correta: 1, explicacao: "O Direito Comercial regula a atividade económica organizada e as relações jurídicas entre comerciantes e empresas." },
        { enunciado: "Uma 'sociedade comercial' distingue-se de uma pessoa singular empresária porque:", opcoes: ["São exatamente a mesma figura jurídica", "A sociedade comercial tem, em regra, personalidade jurídica própria, distinta da dos seus sócios", "A pessoa singular nunca pode exercer comércio", "As sociedades comerciais não têm qualquer responsabilidade legal"], correta: 1, explicacao: "A sociedade comercial tem, em regra, personalidade jurídica própria e autónoma em relação aos seus sócios." },
        { enunciado: "A 'falência' (insolvência) de uma empresa refere-se, essencialmente, a uma situação de:", opcoes: ["Excelente saúde financeira", "Incapacidade de cumprir as obrigações e dívidas vencidas, gerando um processo judicial próprio", "Aumento sustentado dos lucros", "Fusão voluntária com outra empresa"], correta: 1, explicacao: "A insolvência/falência caracteriza-se pela incapacidade de a empresa cumprir as obrigações vencidas, dando origem a processo judicial próprio." },
        { enunciado: "O 'Direito Constitucional' ocupa-se, essencialmente, do estudo:", opcoes: ["Apenas de contratos entre particulares", "Da organização fundamental do Estado, dos direitos fundamentais e da estrutura do poder político", "Exclusivamente de matérias fiscais", "Só de questões de trânsito"], correta: 1, explicacao: "O Direito Constitucional estuda a organização fundamental do Estado, os direitos fundamentais e a estrutura do poder político." },
        { enunciado: "O princípio da 'separação de poderes' visa, essencialmente:", opcoes: ["Concentrar todo o poder num único órgão", "Distribuir as funções do Estado (legislativa, executiva e judicial) por órgãos distintos, evitando abusos", "Eliminar qualquer forma de controlo entre poderes", "Aplicar-se apenas a regimes monárquicos"], correta: 1, explicacao: "A separação de poderes distribui as funções estatais por órgãos distintos, como mecanismo de controlo mútuo e prevenção de abusos." },
        { enunciado: "Os 'direitos fundamentais', consagrados na Constituição, caracterizam-se por:", opcoes: ["Poderem ser suprimidos livremente por qualquer lei ordinária", "Gozarem de proteção reforçada, vinculando os poderes públicos", "Aplicarem-se apenas a cidadãos estrangeiros", "Não terem qualquer eficácia prática"], correta: 1, explicacao: "Os direitos fundamentais gozam de proteção reforçada na Constituição, vinculando diretamente os poderes públicos." },
        { enunciado: "A 'fiscalização da constitucionalidade' das leis serve fundamentalmente para:", opcoes: ["Impedir qualquer controlo sobre o poder legislativo", "Verificar se as normas jurídicas respeitam a Constituição, podendo declarar a sua inconstitucionalidade", "Substituir o processo legislativo", "Ser exercida exclusivamente pelo Presidente"], correta: 1, explicacao: "A fiscalização da constitucionalidade verifica a conformidade das normas com a Constituição, podendo declará-las inconstitucionais." },
        { enunciado: "O 'Direito Administrativo' regula, essencialmente, as relações entre:", opcoes: ["Apenas particulares entre si, sem qualquer intervenção do Estado", "A Administração Pública e os particulares, bem como a organização interna da Administração", "Exclusivamente Estados estrangeiros", "Somente empresas privadas concorrentes"], correta: 1, explicacao: "O Direito Administrativo regula as relações entre a Administração Pública e os particulares, além da organização administrativa." },
        { enunciado: "Um 'ato administrativo' caracteriza-se, tipicamente, por:", opcoes: ["Ser sempre um contrato entre particulares", "Ser uma decisão unilateral de um órgão da Administração Pública, no exercício de poderes públicos, com efeitos jurídicos", "Não produzir qualquer efeito jurídico", "Ser exclusivamente de natureza informal"], correta: 1, explicacao: "O ato administrativo é uma decisão unilateral da Administração, no exercício de poderes públicos, com efeitos jurídicos determinados." },
        { enunciado: "O 'princípio da boa administração' impõe à Administração Pública o dever de:", opcoes: ["Agir de forma arbitrária e sem qualquer critério", "Atuar de forma eficiente, transparente e orientada para a prossecução do interesse público", "Ignorar as necessidades dos cidadãos", "Priorizar exclusivamente interesses privados"], correta: 1, explicacao: "O princípio da boa administração exige eficiência, transparência e orientação para o interesse público na atuação administrativa." },
        { enunciado: "O 'Direito Fiscal/Tributário' tem como principal objeto de estudo:", opcoes: ["Apenas o direito de propriedade privada", "As normas relativas à criação, cobrança e fiscalização de impostos e outros tributos", "Exclusivamente contratos comerciais internacionais", "Somente o direito de família"], correta: 1, explicacao: "O Direito Fiscal estuda as normas relativas à criação, liquidação, cobrança e fiscalização de impostos e outros tributos." },
        { enunciado: "O princípio da 'legalidade tributária' exige que:", opcoes: ["Impostos possam ser criados livremente por qualquer autoridade administrativa", "A criação e definição essencial dos impostos dependa de lei, em regra da Assembleia Nacional", "Não existam quaisquer limites à tributação", "Os impostos sejam sempre retroativos"], correta: 1, explicacao: "O princípio da legalidade tributária exige que a criação e os elementos essenciais dos impostos sejam definidos por lei." },
        { enunciado: "O 'Direito Internacional Público' regula, essencialmente, as relações entre:", opcoes: ["Apenas empresas privadas multinacionais", "Estados soberanos e outras entidades de direito internacional (ex: organizações internacionais)", "Exclusivamente pessoas físicas", "Somente tribunais nacionais"], correta: 1, explicacao: "O Direito Internacional Público regula as relações entre Estados soberanos e outros sujeitos de direito internacional." },
        { enunciado: "Um 'tratado internacional', para vincular um Estado, exige tipicamente:", opcoes: ["Nenhuma formalidade — basta uma intenção informal", "Um processo de negociação, assinatura e, geralmente, ratificação segundo o direito interno de cada Estado", "Ser aprovado exclusivamente por um único funcionário", "Ser sempre secreto"], correta: 1, explicacao: "Um tratado internacional exige, tipicamente, negociação, assinatura e ratificação conforme as normas internas de cada Estado." },
        { enunciado: "A 'imunidade diplomática' concedida a agentes diplomáticos serve principalmente para:", opcoes: ["Permitir a total impunidade pessoal sem qualquer limite", "Garantir o exercício independente das funções diplomáticas, protegendo o agente de certas ações do Estado acreditador", "Ser aplicada a qualquer cidadão estrangeiro", "Substituir o direito interno do Estado de origem"], correta: 1, explicacao: "A imunidade diplomática visa garantir o exercício independente das funções diplomáticas, protegendo o agente de certas medidas do Estado acreditador." },
        { enunciado: "A distinção entre 'lei' e 'decreto' assenta, tipicamente, em:", opcoes: ["Serem termos totalmente equivalentes em qualquer sistema jurídico", "A lei ser, em regra, ato do poder legislativo; o decreto, frequentemente do poder executivo", "O decreto ter sempre valor superior à lei", "A lei nunca poder ser regulamentada"], correta: 1, explicacao: "Em muitos sistemas, a lei é ato próprio do poder legislativo, enquanto o decreto é, frequentemente, ato do poder executivo." },
        { enunciado: "A 'hierarquia das normas jurídicas' coloca, tipicamente, a Constituição:", opcoes: ["No nível mais baixo da hierarquia normativa", "No topo da hierarquia normativa, à qual as demais normas devem conformar-se", "Ao mesmo nível de um simples regulamento", "Sem qualquer relação com as demais normas"], correta: 1, explicacao: "A Constituição ocupa, tipicamente, o topo da hierarquia normativa, devendo as demais normas conformar-se com ela." },
        { enunciado: "O 'princípio da igualdade' perante a lei significa que:", opcoes: ["Todos devem ser tratados de forma idêntica em qualquer circunstância, sem exceção", "Situações iguais devem ser tratadas de forma igual e situações diferentes de forma proporcionalmente diferente", "Apenas se aplica a cidadãos nacionais", "É um princípio sem qualquer valor jurídico"], correta: 1, explicacao: "O princípio da igualdade exige tratar igualmente o que é igual e desigualmente o que é desigual, na medida da diferença." },
        { enunciado: "A 'analogia', como método de integração de lacunas jurídicas, consiste em:", opcoes: ["Criar livremente uma nova lei", "Aplicar a um caso não regulado a solução prevista para um caso semelhante regulado por lei", "Ignorar totalmente o caso não previsto", "Ser proibida em qualquer ramo do Direito"], correta: 1, explicacao: "A analogia aplica, a um caso não expressamente regulado, a solução prevista para um caso análogo, salvo proibição legal (ex: em Direito Penal)." },
        { enunciado: "A 'irretroatividade da lei penal desfavorável' significa que:", opcoes: ["Uma lei penal mais gravosa pode aplicar-se a factos anteriores à sua entrada em vigor", "Uma lei penal que agrava a responsabilidade não se aplica a factos ocorridos antes da sua vigência", "Todas as leis penais são sempre retroativas", "Apenas as leis civis têm esta proteção"], correta: 1, explicacao: "A lei penal mais gravosa não pode aplicar-se retroativamente; já a lei penal mais favorável, em regra, pode aplicar-se retroativamente ao arguido." }
      ]}
    ]
  },
  {
    id: "direito-adm",
    codigo: "DIR-ADM-01",
    titulo: "Direito Administrativo",
    subtitulo: "Lei de Bases da Função Pública (Lei n.º 26/22)",
    accent: "#5C4A2E",
    disciplinas: [
      { id: "geral", nome: "Geral", questoes: [
        { enunciado: "O 'destacamento' na função pública angolana caracteriza-se por:", opcoes: ["Cessação definitiva do vínculo laboral", "Deslocação temporária do funcionário para outro serviço, mantendo o vínculo de origem", "Promoção automática de categoria", "Aposentação antecipada"], correta: 1, explicacao: "O destacamento é temporário: o funcionário mantém o vínculo com o serviço de origem." },
        { enunciado: "A distinção entre 'agente administrativo' e 'funcionário público' assenta principalmente em:", opcoes: ["O local de trabalho", "A natureza e estabilidade do vínculo jurídico-laboral com a Administração", "O nível salarial", "A idade do trabalhador"], correta: 1, explicacao: "O funcionário público tem vínculo definitivo; o agente administrativo tem vínculo menos estável." },
        { enunciado: "A 'nomeação em comissão de serviço' distingue-se da nomeação definitiva porque:", opcoes: ["É sempre vitalícia", "Tem carácter temporário, ligado ao exercício de um cargo de direcção ou confiança", "Não exige habilitações", "É exclusiva do sector privado"], correta: 1, explicacao: "A comissão de serviço é temporária, associada a cargos de direção ou de confiança." },
        { enunciado: "O crime de 'prevaricação' no exercício de funções públicas consiste em:", opcoes: ["Recusar um pedido de informação", "Retardar ou omitir ato devido, ou praticá-lo contra normas legais, para satisfazer interesse próprio", "Faltar ao serviço sem justificação", "Recusar uma promoção"], correta: 1, explicacao: "Prevaricação é a violação consciente do dever funcional para favorecer interesse próprio ou de terceiro." },
        { enunciado: "Na penhora, arresto e sequestro (direito processual civil), o que diferencia o arresto dos demais é:", opcoes: ["Ser uma medida cautelar preventiva, antes de sentença, para acautelar bens do devedor", "Ser aplicável apenas a imóveis", "Ser irreversível", "Exigir sempre confissão da dívida"], correta: 0, explicacao: "O arresto é medida cautelar preventiva que visa assegurar bens do devedor antes de decisão final." }
      ]}
    ]
  },
  {
    id: "portugues",
    codigo: "LP-01",
    titulo: "Língua Portuguesa",
    subtitulo: "Sintaxe, crase e figuras de linguagem",
    accent: "#3A5A40",
    disciplinas: [
      { id: "geral", nome: "Geral", questoes: [
        { enunciado: "Assinale a frase em que o uso do acento indicativo de crase está correto:", opcoes: ["Entreguei o documento à ela.", "Refiro-me à situação apresentada.", "Cheguei à uma hora incerta.", "Isto diz respeito à todos nós."], correta: 1, explicacao: "Crase é a fusão da preposição 'a' com o artigo 'a'. 'À situação' está correto pois há artigo definido a fundir." },
        { enunciado: "Na frase 'O relatório, que o director assinou ontem, foi arquivado', a oração sublinhada classifica-se como:", opcoes: ["Subordinada substantiva", "Subordinada adjetiva explicativa", "Coordenada assindética", "Subordinada adverbial condicional"], correta: 1, explicacao: "É uma oração adjetiva explicativa, isolada por vírgulas, que acrescenta informação não essencial." },
        { enunciado: "A figura de linguagem presente em 'o silêncio gritava naquela sala' chama-se:", opcoes: ["Metonímia", "Hipérbole", "Paradoxo/Oxímoro", "Eufemismo"], correta: 2, explicacao: "Há contradição aparente entre 'silêncio' e 'gritava', característica do paradoxo." },
        { enunciado: "Em 'Bebeu três copos', a palavra 'copos' está empregue por metonímia significando:", opcoes: ["O recipiente em si", "O conteúdo (a bebida)", "Uma quantidade exacta", "Um tipo de louça"], correta: 1, explicacao: "Metonímia: usa-se o recipiente ('copos') para designar o conteúdo (a bebida)." },
        { enunciado: "Quanto à concordância verbal, a frase correta é:", opcoes: ["Fazem dois anos que ele saiu.", "Faz dois anos que ele saiu.", "Fazem-se dois anos que ele saiu.", "Há dois anos atrás que ele saiu."], correta: 1, explicacao: "O verbo 'fazer', indicando tempo decorrido, é impessoal e fica na 3.ª pessoa do singular: 'Faz dois anos'." }
      ]}
    ]
  },
  {
    id: "saude",
    codigo: "SAÚDE-01",
    titulo: "Ministério da Saúde",
    subtitulo: "Apoio Hospitalar · Carreira Médica · Enfermagem · Terapêutico · Análises Clínicas · Eletromedicina (meta: 50/categoria)",
    accent: "#2E5C6E",
    disciplinas: [
      { id: "apoio-hospitalar", nome: "Apoio Hospitalar (Maqueiro, Secretário Clínico, Vigilante)", questoes: [
        { enunciado: "A função principal de um maqueiro num serviço hospitalar é:", opcoes: ["Administrar medicação aos doentes", "Transportar doentes em segurança dentro das instalações hospitalares (maca, cadeira de rodas)", "Realizar diagnósticos clínicos", "Gerir o orçamento do hospital"], correta: 1, explicacao: "O maqueiro assegura o transporte seguro de doentes entre serviços, salas de exame, bloco operatório, etc." },
        { enunciado: "Ao transportar um doente numa maca, o maqueiro deve, por norma de segurança:", opcoes: ["Movimentar-se o mais rápido possível, ignorando obstáculos", "Verificar se as grades de proteção da maca estão levantadas", "Deixar o doente sem vigilância a meio do trajeto", "Ignorar instruções da equipa de enfermagem"], correta: 1, explicacao: "As grades de proteção levantadas evitam quedas do doente durante o transporte, sendo uma norma básica de segurança." },
        { enunciado: "O secretário clínico, numa unidade de saúde, tem como uma das principais funções:", opcoes: ["Realizar cirurgias de urgência", "Gerir o processo administrativo do doente, incluindo marcações e arquivo clínico", "Prescrever medicamentos", "Administrar tratamentos de fisioterapia"], correta: 1, explicacao: "O secretário clínico assegura a gestão administrativa do processo do doente: marcações, registos e arquivo." },
        { enunciado: "O 'processo clínico' de um doente, mantido pelo secretariado clínico, deve ser tratado com:", opcoes: ["Total liberdade de acesso a qualquer pessoa", "Confidencialidade, respeitando o sigilo profissional e a proteção de dados de saúde", "Divulgação pública para fins estatísticos sem qualquer restrição", "Nenhum cuidado especial"], correta: 1, explicacao: "O processo clínico contém dados sensíveis e deve ser tratado com confidencialidade e sigilo profissional." },
        { enunciado: "A função do vigilante/segurança hospitalar inclui, entre outras:", opcoes: ["Realizar diagnósticos médicos", "Garantir a segurança de pessoas e bens nas instalações e controlar acessos", "Administrar injeções", "Substituir os enfermeiros em falta"], correta: 1, explicacao: "O vigilante hospitalar assegura a segurança física das instalações, controlo de acessos e apoio em situações de conflito ou emergência." },
        { enunciado: "Assinale a frase gramaticalmente correta:", opcoes: ["Ele fazem sempre o seu trabalho com cuidado.", "Ele faz sempre o seu trabalho com cuidado.", "Ele faz sempre o seu trabalho com cuidados.", "Ele fez sempre o seu trabalho, com cuidado ele."], correta: 1, explicacao: "O verbo 'fazer' concorda na 3.ª pessoa do singular com o sujeito 'ele': 'ele faz'." },
        { enunciado: "Se um turno hospitalar tem 8 horas e um funcionário já trabalhou 5 horas e 30 minutos, quanto tempo falta para terminar o turno?", opcoes: ["2 horas", "2 horas e 30 minutos", "3 horas", "1 hora e 30 minutos"], correta: 1, explicacao: "8h - 5h30 = 2h30, ou seja, faltam 2 horas e 30 minutos para terminar o turno." },
        { enunciado: "A Organização Mundial da Saúde (OMS) é uma agência especializada vinculada a que organização internacional?", opcoes: ["União Europeia", "Organização das Nações Unidas (ONU)", "União Africana", "CPLP"], correta: 1, explicacao: "A OMS é a agência especializada da ONU responsável por questões de saúde pública a nível mundial." },
        { enunciado: "Num hospital, a 'triagem' de doentes à entrada da urgência tem como principal objetivo:", opcoes: ["Atender os doentes por ordem de chegada, sem qualquer avaliação", "Avaliar a gravidade clínica para definir prioridades de atendimento", "Cobrar taxas moderadoras antecipadamente", "Registar apenas dados pessoais, sem avaliação clínica"], correta: 1, explicacao: "A triagem avalia a gravidade clínica do doente para determinar a prioridade e ordem de atendimento na urgência." },
        { enunciado: "Numa situação de incêndio numa unidade hospitalar, a prioridade imediata do pessoal de apoio (maqueiros, vigilantes) deve ser:", opcoes: ["Recolher bens pessoais antes de agir", "Seguir o plano de evacuação, priorizando a segurança dos doentes e colaboradores", "Ignorar o alarme até confirmação visual do fogo", "Aguardar instruções apenas do diretor clínico"], correta: 1, explicacao: "Em situações de emergência, deve seguir-se o plano de evacuação estabelecido, priorizando sempre a segurança das pessoas." }
      ]},
      { id: "carreira-medica", nome: "Carreira Médica", questoes: [
        { enunciado: "O juramento de Hipócrates, historicamente associado à ética médica, tem como um dos seus princípios fundamentais:", opcoes: ["Priorizar o lucro acima do bem-estar do doente", "O compromisso de não causar dano ao doente ('primum non nocere')", "A obrigatoriedade de tratar apenas doentes que possam pagar", "A permissão para divulgar livremente dados dos doentes"], correta: 1, explicacao: "Um dos princípios centrais da ética médica hipocrática é 'primeiro, não causar dano' (primum non nocere)." },
        { enunciado: "O 'consentimento informado' do doente, antes de um procedimento médico, exige que o médico:", opcoes: ["Realize o procedimento sem qualquer explicação prévia", "Explique ao doente, em linguagem compreensível, os riscos e benefícios do procedimento antes de obter a sua concordância", "Obtenha apenas a assinatura, sem necessidade de explicação", "Decida sozinho, sem envolver o doente"], correta: 1, explicacao: "O consentimento informado exige que o doente compreenda riscos e benefícios antes de autorizar um procedimento." },
        { enunciado: "A 'anamnese', na prática clínica, refere-se a:", opcoes: ["Um exame laboratorial de sangue", "A recolha da história clínica do doente através de entrevista", "Um tipo de cirurgia", "Um medicamento específico"], correta: 1, explicacao: "A anamnese é o processo de recolha da história clínica do doente através de entrevista estruturada." },
        { enunciado: "Os sinais vitais básicos habitualmente monitorizados num doente incluem:", opcoes: ["Apenas a altura", "Temperatura, frequência cardíaca, frequência respiratória e pressão arterial", "Apenas o peso corporal", "Apenas a cor dos olhos"], correta: 1, explicacao: "Os sinais vitais clássicos são temperatura corporal, frequência cardíaca, frequência respiratória e pressão arterial." },
        { enunciado: "O sigilo médico (segredo profissional) obriga o médico a:", opcoes: ["Divulgar livremente informação clínica a qualquer pessoa que pergunte", "Não revelar informação sobre o doente sem o seu consentimento, salvo exceções legais", "Partilhar dados clínicos nas redes sociais", "Informar sempre a entidade patronal do doente"], correta: 1, explicacao: "O sigilo médico protege a confidencialidade da informação clínica, com exceções previstas na lei (ex: risco de vida de terceiros)." },
        { enunciado: "A hipertensão arterial é clinicamente definida, em linhas gerais, como:", opcoes: ["Pressão arterial persistentemente elevada acima dos valores de referência", "Uma doença exclusivamente genética sem fatores externos", "Uma condição que afeta apenas idosos", "Ausência de sintomas em qualquer caso"], correta: 0, explicacao: "A hipertensão caracteriza-se pela elevação persistente da pressão arterial acima dos valores considerados normais." },
        { enunciado: "A diabetes mellitus tipo 2 relaciona-se principalmente com:", opcoes: ["Resistência à insulina e/ou produção insuficiente de insulina pelo organismo", "Uma infeção viral aguda", "Uma lesão traumática do fígado", "Uma alergia alimentar simples"], correta: 0, explicacao: "A diabetes tipo 2 caracteriza-se por resistência à ação da insulina e/ou produção insuficiente desta hormona." },
        { enunciado: "O 'diagnóstico diferencial', em medicina, refere-se ao processo de:", opcoes: ["Escolher aleatoriamente uma doença", "Considerar e comparar várias hipóteses diagnósticas possíveis com base nos sintomas apresentados", "Ignorar sintomas menos comuns", "Aplicar sempre o mesmo tratamento a todos os doentes"], correta: 1, explicacao: "O diagnóstico diferencial consiste em considerar várias hipóteses clínicas plausíveis antes de chegar a um diagnóstico final." }
      ]},
      { id: "enfermagem", nome: "Enfermagem", questoes: [
        { enunciado: "A principal função dos glóbulos vermelhos (eritrócitos) no organismo humano é:", opcoes: ["Combater infecções", "Transportar oxigénio através da hemoglobina", "Coagulação do sangue", "Produzir anticorpos"], correta: 1, explicacao: "Os eritrócitos contêm hemoglobina, proteína responsável pelo transporte de oxigénio dos pulmões aos tecidos." },
        { enunciado: "Na triagem de Manchester, usada em serviços de urgência, a cor vermelha indica:", opcoes: ["Caso não urgente, pode aguardar horas", "Emergência — atendimento imediato", "Caso já resolvido", "Encaminhamento para consulta externa"], correta: 1, explicacao: "A cor vermelha na triagem de Manchester corresponde à prioridade máxima, exigindo atendimento imediato." },
        { enunciado: "A vacina é um exemplo de imunidade:", opcoes: ["Passiva natural", "Ativa artificial", "Passiva artificial", "Ativa natural"], correta: 1, explicacao: "A vacinação induz o próprio organismo a produzir anticorpos, sendo por isso imunidade ativa e artificial." },
        { enunciado: "Em saúde pública, a 'taxa de mortalidade infantil' mede:", opcoes: ["Óbitos de crianças menores de 1 ano por cada 1000 nados-vivos", "Total de nascimentos por ano", "Número de vacinas aplicadas", "Casos de desnutrição registados"], correta: 0, explicacao: "É um indicador-chave de saúde pública: número de óbitos de menores de 1 ano por 1000 nados-vivos." },
        { enunciado: "A administração de medicação segundo os '5 certos' de enfermagem inclui verificar:", opcoes: ["Apenas o nome do doente", "Doente certo, medicamento certo, dose certa, via certa e hora certa", "Apenas a cor do comprimido", "Apenas a validade da embalagem"], correta: 1, explicacao: "Os '5 certos' são uma norma de segurança na administração de medicação: doente, medicamento, dose, via e hora certos." },
        { enunciado: "A técnica de lavagem das mãos antes e depois do contacto com o doente tem como principal objetivo:", opcoes: ["Cumprir uma formalidade sem utilidade prática", "Prevenir a transmissão de infeções associadas aos cuidados de saúde", "Aumentar o tempo de atendimento", "Substituir o uso de luvas em qualquer situação"], correta: 1, explicacao: "A higienização das mãos é uma das medidas mais eficazes na prevenção de infeções hospitalares." },
        { enunciado: "Uma úlcera de pressão (escara) em doentes acamados desenvolve-se principalmente devido a:", opcoes: ["Excesso de hidratação da pele", "Pressão prolongada sobre a pele, reduzindo a circulação sanguínea local", "Uma alergia alimentar", "Exposição solar excessiva"], correta: 1, explicacao: "As úlceras de pressão resultam da compressão prolongada dos tecidos, que reduz a circulação sanguínea local." },
        { enunciado: "O posicionamento correto de um doente inconsciente mas a respirar, na ausência de suspeita de trauma, deve ser preferencialmente:", opcoes: ["De barriga para baixo, sem qualquer cuidado adicional", "Em posição lateral de segurança (PLS)", "Sentado numa cadeira", "De pé, apoiado numa parede"], correta: 1, explicacao: "A posição lateral de segurança previne a obstrução das vias aéreas por vómito ou queda da língua em doentes inconscientes." }
      ]},
      { id: "terapeutico", nome: "Terapêutico (Fisioterapia e afins)", questoes: [
        { enunciado: "A fisioterapia, enquanto área terapêutica, ocupa-se principalmente de:", opcoes: ["Prescrever medicamentos", "Reabilitar e prevenir disfunções físicas através de técnicas de movimento, exercício e agentes físicos", "Realizar cirurgias", "Analisar amostras de sangue"], correta: 1, explicacao: "A fisioterapia utiliza técnicas de movimento, exercício terapêutico e agentes físicos para reabilitar e prevenir disfunções." },
        { enunciado: "A crioterapia (aplicação de frio) é habitualmente indicada, numa fase aguda de lesão, para:", opcoes: ["Aumentar a inflamação", "Reduzir a dor, o edema e a inflamação local", "Substituir totalmente a reabilitação", "Aumentar a temperatura muscular"], correta: 1, explicacao: "O frio (crioterapia) é aplicado na fase aguda para reduzir dor, edema e inflamação local." },
        { enunciado: "A reabilitação após um Acidente Vascular Cerebral (AVC) tem como um dos principais objetivos:", opcoes: ["Impedir qualquer tipo de movimento do doente", "Recuperar, tanto quanto possível, a função motora e a autonomia do doente", "Substituir totalmente o tratamento médico", "Ser aplicada apenas a doentes jovens"], correta: 1, explicacao: "A reabilitação pós-AVC visa recuperar função motora, comunicação e autonomia funcional do doente." },
        { enunciado: "A terapia ocupacional distingue-se da fisioterapia por:", opcoes: ["Serem exatamente a mesma disciplina", "Focar-se sobretudo na recuperação da capacidade do doente para realizar atividades da vida diária", "Não ter qualquer relação com a reabilitação", "Ocupar-se exclusivamente de questões psicológicas"], correta: 1, explicacao: "A terapia ocupacional foca-se na recuperação da autonomia do doente nas atividades da vida diária (comer, vestir, higiene)." },
        { enunciado: "Os exercícios de fortalecimento muscular, numa fase de reabilitação, devem ser, em regra:", opcoes: ["Aplicados de forma abrupta e sem progressão", "Introduzidos de forma progressiva, respeitando os limites e evolução do doente", "Evitados em qualquer circunstância", "Idênticos para todos os doentes, sem individualização"], correta: 1, explicacao: "A progressão gradual dos exercícios, adaptada a cada doente, é um princípio fundamental da reabilitação segura." },
        { enunciado: "A hidroterapia, enquanto técnica terapêutica, utiliza principalmente:", opcoes: ["Exposição à radiação", "As propriedades físicas da água (temperatura, flutuabilidade, resistência) para fins terapêuticos", "Apenas medicação oral", "Exclusivamente eletricidade de alta voltagem"], correta: 1, explicacao: "A hidroterapia usa as propriedades físicas da água para facilitar o movimento e a reabilitação com menor impacto articular." },
        { enunciado: "A avaliação da amplitude articular (goniometria), realizada por terapeutas, serve para:", opcoes: ["Medir a temperatura corporal", "Quantificar o grau de mobilidade de uma articulação", "Avaliar a função renal", "Determinar o grupo sanguíneo do doente"], correta: 1, explicacao: "A goniometria mede o ângulo de amplitude de movimento de uma articulação, essencial na avaliação funcional." },
        { enunciado: "Um plano de reabilitação individualizado deve, antes de mais, basear-se:", opcoes: ["Num modelo único aplicado a todos os doentes sem exceção", "Na avaliação específica das limitações e objetivos funcionais de cada doente", "Apenas na idade do doente", "Na disponibilidade de equipamento, ignorando a condição clínica"], correta: 1, explicacao: "Um plano terapêutico eficaz parte da avaliação individualizada das limitações funcionais e objetivos de cada doente." }
      ]},
      { id: "analises-clinicas", nome: "Análises Clínicas", questoes: [
        { enunciado: "O hemograma completo é um exame laboratorial que avalia principalmente:", opcoes: ["A função renal exclusivamente", "As células do sangue: glóbulos vermelhos, glóbulos brancos e plaquetas", "Apenas os níveis de glicose", "A função hepática exclusivamente"], correta: 1, explicacao: "O hemograma avalia quantitativa e qualitativamente as células sanguíneas: eritrócitos, leucócitos e plaquetas." },
        { enunciado: "A glicemia em jejum é um exame utilizado principalmente para rastrear ou monitorizar:", opcoes: ["Infeções respiratórias", "Diabetes mellitus", "Problemas de visão", "Doenças da pele"], correta: 1, explicacao: "A glicemia em jejum mede o nível de glicose no sangue, sendo essencial no rastreio e controlo da diabetes." },
        { enunciado: "A técnica asséptica na colheita de sangue tem como principal objetivo:", opcoes: ["Acelerar o procedimento sem outros cuidados", "Prevenir a contaminação da amostra e a infeção do doente", "Reduzir custos do material", "Facilitar a leitura dos resultados"], correta: 1, explicacao: "A técnica asséptica evita a contaminação da amostra colhida e reduz o risco de infeção no local da colheita." },
        { enunciado: "O exame de urina tipo II (urina II) é utilizado, entre outros fins, para detetar:", opcoes: ["Apenas problemas cardíacos", "Infeções urinárias, alterações renais e outras anomalias metabólicas", "Exclusivamente problemas dentários", "Apenas alergias alimentares"], correta: 1, explicacao: "A análise de urina tipo II permite detetar infeções urinárias, alterações renais e outras anomalias metabólicas." },
        { enunciado: "A hemólise de uma amostra de sangue colhida, quando não desejada, pode comprometer o resultado de um exame porque:", opcoes: ["Melhora sempre a qualidade do exame", "Liberta conteúdo celular que pode alterar artificialmente os resultados de certos parâmetros", "Não tem qualquer efeito nos resultados", "Só afeta exames de urina"], correta: 1, explicacao: "A hemólise (rutura dos glóbulos vermelhos) liberta substâncias intracelulares que podem alterar falsamente certos resultados laboratoriais." },
        { enunciado: "Os grupos sanguíneos do sistema ABO são determinados pela presença ou ausência de:", opcoes: ["Vitaminas específicas no sangue", "Antigénios específicos na superfície dos glóbulos vermelhos", "Um tipo particular de plaqueta", "Apenas o nível de hemoglobina"], correta: 1, explicacao: "O sistema ABO baseia-se na presença ou ausência de antigénios A e B na superfície dos glóbulos vermelhos." },
        { enunciado: "O fator Rh, associado ao grupo sanguíneo, é clinicamente relevante, entre outras razões, por causa de:", opcoes: ["Não ter qualquer relevância clínica", "Possíveis complicações em transfusões e em gestações de mães Rh-negativo com fetos Rh-positivo", "Ser apenas um valor estético", "Determinar exclusivamente a cor dos olhos"], correta: 1, explicacao: "A incompatibilidade Rh pode causar reações transfusionais graves e complicações em certas gestações (doença hemolítica do recém-nascido)." },
        { enunciado: "A cadeia de custódia de uma amostra laboratorial refere-se, essencialmente, a:", opcoes: ["Um tipo de exame sanguíneo", "O registo e controlo rigoroso do percurso da amostra, desde a colheita até ao resultado, garantindo a sua integridade", "Um equipamento de proteção individual", "Um medicamento usado em análises"], correta: 1, explicacao: "A cadeia de custódia assegura o rastreio e a integridade da amostra desde a colheita até à emissão do resultado." }
      ]},
      { id: "eletromedicina", nome: "Eletromedicina", questoes: [
        { enunciado: "Um técnico de eletromedicina é responsável, principalmente, por:", opcoes: ["Diagnosticar doenças", "Instalar, manter e reparar equipamentos médicos e hospitalares", "Administrar medicação aos doentes", "Realizar cirurgias"], correta: 1, explicacao: "O técnico de eletromedicina assegura a instalação, manutenção preventiva e reparação de equipamento médico-hospitalar." },
        { enunciado: "A manutenção preventiva de equipamentos médicos tem como principal objetivo:", opcoes: ["Reduzir a vida útil do equipamento", "Detetar e corrigir potenciais falhas antes que ocorram, garantindo segurança e fiabilidade", "Aumentar o número de avarias", "Ser realizada apenas após uma avaria grave"], correta: 1, explicacao: "A manutenção preventiva antecipa e evita falhas, assegurando a fiabilidade e segurança contínua do equipamento." },
        { enunciado: "Um eletrocardiógrafo (ECG) é um equipamento utilizado para:", opcoes: ["Medir a temperatura corporal", "Registar a atividade elétrica do coração", "Analisar amostras de urina", "Medir a pressão intraocular"], correta: 1, explicacao: "O eletrocardiógrafo regista a atividade elétrica do coração, permitindo detetar arritmias e outras alterações cardíacas." },
        { enunciado: "A calibração de equipamentos médicos (ex: monitores, bombas infusoras) serve para garantir que:", opcoes: ["O equipamento fica mais bonito esteticamente", "As medições e o funcionamento do equipamento correspondem aos valores de referência corretos", "O equipamento fica mais lento", "Não é necessária qualquer verificação posterior"], correta: 1, explicacao: "A calibração assegura que o equipamento mede e funciona de acordo com padrões de referência corretos e fiáveis." },
        { enunciado: "Um desfibrilhador é um equipamento médico utilizado principalmente para:", opcoes: ["Medir a glicemia", "Reverter certas arritmias cardíacas graves através de um choque elétrico controlado", "Realizar radiografias", "Analisar amostras de sangue"], correta: 1, explicacao: "O desfibrilhador aplica um choque elétrico controlado para reverter arritmias cardíacas potencialmente fatais (ex: fibrilhação ventricular)." },
        { enunciado: "Os equipamentos médicos que utilizam radiação ionizante (ex: aparelhos de raio-X) exigem, entre outros cuidados:", opcoes: ["Nenhum cuidado especial de proteção radiológica", "Proteção radiológica adequada para profissionais e doentes, segundo normas de segurança", "Uso exclusivo sem qualquer formação prévia", "Utilização sem qualquer manutenção periódica"], correta: 1, explicacao: "Equipamentos com radiação ionizante exigem proteção radiológica rigorosa, formação adequada e manutenção periódica." },
        { enunciado: "A ventilação mecânica, aplicada através de um ventilador, é utilizada quando o doente:", opcoes: ["Não necessita de qualquer suporte respiratório", "Não consegue manter uma respiração eficaz por si próprio", "Está totalmente saudável", "Apenas precisa de medicação oral"], correta: 1, explicacao: "A ventilação mecânica fornece suporte respiratório a doentes incapazes de manter uma respiração eficaz de forma autónoma." },
        { enunciado: "O registo e controlo periódico do estado de funcionamento dos equipamentos médicos deve ser, preferencialmente, documentado em:", opcoes: ["Nenhum registo — apenas memória do técnico", "Um sistema/ficha de manutenção que permita rastrear o histórico do equipamento", "Um documento informal, sem qualquer estrutura", "Apenas comunicação verbal, sem registo escrito"], correta: 1, explicacao: "O registo documentado da manutenção permite rastrear o histórico do equipamento, essencial para a segurança e gestão do parque de equipamentos." }
      ]}
    ]
  },
  {
    id: "economia",
    codigo: "ECON-01",
    titulo: "Economia e Gestão",
    subtitulo: "Admissão a Economia / Gestão — micro e macroeconomia",
    accent: "#6E5C2E",
    disciplinas: [
      { id: "geral", nome: "Geral", questoes: [
        { enunciado: "A inflação é definida como:", opcoes: ["Queda generalizada e sustentada dos preços", "Aumento generalizado e sustentado do nível de preços numa economia", "Aumento do câmbio da moeda nacional", "Redução da taxa de juro"], correta: 1, explicacao: "Inflação é o aumento contínuo e generalizado dos preços de bens e serviços numa economia." },
        { enunciado: "A lei da procura estabelece que, mantendo tudo o resto constante:", opcoes: ["Quando o preço sobe, a quantidade procurada sobe", "Quando o preço sobe, a quantidade procurada tende a descer", "Preço e procura não se relacionam", "A procura depende apenas da oferta"], correta: 1, explicacao: "Existe relação inversa entre preço e quantidade procurada, mantendo-se constantes os demais factores." },
        { enunciado: "O PIB (Produto Interno Bruto) mede:", opcoes: ["A dívida externa de um país", "O valor total de bens e serviços finais produzidos num país num dado período", "O total de impostos arrecadados", "A taxa de câmbio média"], correta: 1, explicacao: "O PIB é o valor de mercado de todos os bens e serviços finais produzidos numa economia num período determinado." },
        { enunciado: "Numa balança comercial, um saldo positivo (superavit) ocorre quando:", opcoes: ["As importações superam as exportações", "As exportações superam as importações", "Não há trocas comerciais", "A moeda nacional se desvaloriza"], correta: 1, explicacao: "Superavit comercial existe quando o valor exportado é maior que o valor importado." }
      ]}
    ]
  },
  {
    id: "geral-universidades",
    codigo: "UNIV-GERAL-01",
    titulo: "Outras Universidades e Institutos Públicos",
    subtitulo: "Cultura geral para admissão — ISPTEC, Katyavala Bwila, Mandume Ya Ndemufayo, entre outras",
    accent: "#7A3E5C",
    disciplinas: [
      { id: "geral", nome: "Geral", questoes: [
        { enunciado: "A Universidade Agostinho Neto (UAN) tem a sua origem histórica ligada a:", opcoes: ["Uma universidade fundada após 2002", "A antiga Universidade de Angola, criada ainda no período colonial", "Uma instituição exclusivamente privada", "Uma faculdade criada pela ONU"], correta: 1, explicacao: "A UAN sucede à antiga Universidade de Angola, sendo a mais antiga instituição de ensino superior público do país." },
        { enunciado: "A Universidade José Eduardo dos Santos (UJES), sediada no Huambo, resultou de:", opcoes: ["Fusão entre instituições privadas", "Um processo de reforma do ensino superior público que separou pólos regionais da antiga UAN", "Criação exclusiva para ensino técnico-profissional", "Uma parceria estrangeira sem ligação ao Estado"], correta: 1, explicacao: "A UJES surgiu da reorganização do subsistema de ensino superior público angolano, herdando pólos regionais antes ligados à UAN." },
        { enunciado: "O regime geral de acesso ao ensino superior público em Angola é coordenado, a nível nacional, por:", opcoes: ["Cada faculdade de forma totalmente independente", "O órgão do Ministério do Ensino Superior responsável pelo acesso, através de exame/concurso", "Apenas por concurso interno de cada província", "Não existe processo de acesso formal"], correta: 1, explicacao: "O acesso ao ensino superior público segue normas do Ministério do Ensino Superior, geralmente via exame de acesso." },
        { enunciado: "A província do Huambo é sede de qual instituição pública de ensino superior?", opcoes: ["Universidade Katyavala Bwila", "Universidade José Eduardo dos Santos (UJES)", "Universidade Mandume Ya Ndemufayo", "Universidade 11 de Novembro"], correta: 1, explicacao: "A UJES tem a sua sede principal na província do Huambo." },
        { enunciado: "A Universidade Katyavala Bwila tem a sua sede principal na província de:", opcoes: ["Benguela", "Cabinda", "Lunda Norte", "Namibe"], correta: 0, explicacao: "A Universidade Katyavala Bwila está sediada em Benguela, cobrindo também pólos noutras províncias vizinhas." },
        { enunciado: "A Universidade Mandume Ya Ndemufayo está sediada em qual província?", opcoes: ["Huíla", "Malanje", "Bié", "Zaire"], correta: 0, explicacao: "A Universidade Mandume Ya Ndemufayo tem a sua sede no Lubango, província da Huíla." }
      ]}
    ]
  },
  {
    id: "ujes-direito",
    codigo: "UJES-DIR-01",
    titulo: "UJES — Ingresso à Faculdade de Direito",
    subtitulo: "Bloco único e misto: Língua Portuguesa + História Universal + Cultura Geral — nível extremo",
    accent: "#8C2F39",
    disciplinas: [
      { id: "direito-misto", nome: "Prova Mista (Português, História e Cultura Geral)", questoes: [
        { enunciado: "Na frase 'O réu, cuja culpa não ficou provada, foi absolvido', o pronome relativo 'cuja' introduz uma ideia de:", opcoes: ["Causa", "Posse/pertença", "Consequência", "Condição"], correta: 1, explicacao: "'Cuja' é pronome relativo possessivo, indicando posse — a culpa relaciona-se ao réu." },
        { enunciado: "Assinale a opção em que a regência verbal está correta segundo a norma culta:", opcoes: ["Assistiu o filme inteiro sem se levantar.", "Assistiu ao filme inteiro sem se levantar.", "Assistiu no filme inteiro sem se levantar.", "Assistiu para o filme inteiro sem se levantar."], correta: 1, explicacao: "No sentido de 'ver/presenciar', o verbo 'assistir' rege a preposição 'a': assistir ao filme." },
        { enunciado: "Na frase 'Se ele tivesse estudado, teria sido aprovado', os verbos destacados estão respectivamente em:", opcoes: ["Pretérito perfeito e futuro do presente", "Mais-que-perfeito composto do conjuntivo e futuro do pretérito composto", "Presente do indicativo e pretérito imperfeito", "Imperativo e gerúndio"], correta: 1, explicacao: "'Tivesse estudado' é pretérito mais-que-perfeito composto do conjuntivo; 'teria sido' é futuro do pretérito composto." },
        { enunciado: "O uso do hífen na palavra 'guarda-chuva' segue a regra de:", opcoes: ["Palavras compostas por justaposição, com sentido unitário próprio", "Prefixação com 're-'", "Sufixação nominal", "Locução adverbial simples"], correta: 0, explicacao: "'Guarda-chuva' é palavra composta por justaposição, cujo sentido conjunto é diferente da soma das partes." },
        { enunciado: "Em 'Poucos foram os que compareceram à reunião', o sujeito da oração é:", opcoes: ["'à reunião'", "'poucos'", "'foram'", "Oração sem sujeito"], correta: 1, explicacao: "'Poucos' é o núcleo do sujeito, antecedendo o predicativo 'os que compareceram à reunião'." },
        { enunciado: "A ambiguidade da frase 'Vi o professor a sair do carro' pode ser resolvida reescrevendo-a como:", opcoes: ["'O professor, ao sair do carro, foi visto por mim' (mantém a ambiguidade)", "'Vi o professor no momento em que eu saía do carro' ou 'Vi o professor no momento em que ele saía do carro'", "Não há ambiguidade nesta frase", "A frase deve ser eliminada por estar incorreta"], correta: 1, explicacao: "A ambiguidade está em saber quem sai do carro; reescrever especificando o sujeito resolve o problema." },
        { enunciado: "Na oração 'Espero que ele chegue a tempo', o modo verbal de 'chegue' é:", opcoes: ["Indicativo", "Conjuntivo (subjuntivo)", "Imperativo", "Infinitivo pessoal"], correta: 1, explicacao: "Após verbos que exprimem desejo ou dúvida ('esperar que'), usa-se o modo conjuntivo." },
        { enunciado: "A frase que respeita corretamente a colocação pronominal na norma culta é:", opcoes: ["Não se esqueça de mim.", "Não esqueça-se de mim.", "Não me esqueça-se.", "Não esqueça se de mim."], correta: 0, explicacao: "Com palavras de sentido negativo ('não'), a próclise é a colocação correta: 'não se esqueça'." },
        { enunciado: "A Revolução Francesa (1789) teve como um dos seus principais lemas:", opcoes: ["Ordem, Progresso e Trabalho", "Liberdade, Igualdade e Fraternidade", "Paz, Pão e Terra", "Deus, Pátria e Família"], correta: 1, explicacao: "'Liberté, Égalité, Fraternité' tornou-se o lema simbólico da Revolução Francesa." },
        { enunciado: "A Primeira Guerra Mundial (1914-1918) foi despoletada imediatamente pelo(a):", opcoes: ["Ataque a Pearl Harbor", "Assassinato do Arquiduque Francisco Ferdinando em Sarajevo", "Queda do Muro de Berlim", "Revolução Russa"], correta: 1, explicacao: "O assassinato do Arquiduque Francisco Ferdinando, herdeiro do trono Austro-Húngaro, em 1914, foi o estopim imediato da guerra." },
        { enunciado: "A Revolução Industrial, iniciada na Grã-Bretanha no século XVIII, teve como marco tecnológico central:", opcoes: ["A invenção da imprensa", "O aperfeiçoamento da máquina a vapor", "A descoberta da eletricidade", "A invenção do telefone"], correta: 1, explicacao: "O aperfeiçoamento da máquina a vapor por James Watt impulsionou a mecanização da produção industrial." },
        { enunciado: "A Guerra Fria (1947-1991) caracterizou-se essencialmente pela rivalidade entre:", opcoes: ["França e Alemanha", "Estados Unidos e União Soviética", "China e Japão", "Reino Unido e Espanha"], correta: 1, explicacao: "A Guerra Fria foi um período de tensão ideológica, política e militar entre EUA (capitalismo) e URSS (comunismo)." },
        { enunciado: "A tomada da Bastilha, em Julho de 1789, é considerada um marco simbólico de:", opcoes: ["O início da Revolução Francesa", "O fim da Segunda Guerra Mundial", "A independência dos Estados Unidos", "A unificação da Alemanha"], correta: 0, explicacao: "A queda da Bastilha, prisão-símbolo do Antigo Regime, marcou simbolicamente o início da Revolução Francesa." },
        { enunciado: "O Congresso de Berlim (1884-1885) teve como principal consequência para África:", opcoes: ["A independência de todos os territórios africanos", "A partilha de África entre as potências coloniais europeias", "A criação da União Africana", "O fim do tráfico de escravos"], correta: 1, explicacao: "A Conferência de Berlim formalizou critérios para a partilha colonial do continente africano entre potências europeias." },
        { enunciado: "A Revolução Russa de 1917 conduziu à ascensão de que sistema político?", opcoes: ["Monarquia constitucional", "Socialismo/comunismo, sob liderança bolchevique", "Fascismo", "Democracia liberal parlamentar"], correta: 1, explicacao: "A Revolução de Outubro de 1917, liderada pelos bolcheviques de Lenine, instaurou o primeiro Estado socialista." },
        { enunciado: "A Queda do Muro de Berlim, em 1989, simbolizou:", opcoes: ["O início da Guerra Fria", "O fim da divisão entre Alemanha Ocidental e Oriental e o declínio do bloco soviético", "A criação da União Europeia", "O início da Segunda Guerra Mundial"], correta: 1, explicacao: "A queda do muro representou o colapso da divisão da Alemanha e antecedeu o fim da URSS em 1991." },
        { enunciado: "A Declaração Universal dos Direitos Humanos foi adotada pela ONU em que ano?", opcoes: ["1945", "1948", "1955", "1962"], correta: 1, explicacao: "A Declaração Universal dos Direitos Humanos foi proclamada pela Assembleia Geral da ONU em 10 de dezembro de 1948." },
        { enunciado: "A independência de Angola foi proclamada em:", opcoes: ["4 de fevereiro de 1961", "11 de novembro de 1975", "25 de abril de 1974", "27 de maio de 1977"], correta: 1, explicacao: "Angola tornou-se independente de Portugal a 11 de novembro de 1975." },
        { enunciado: "A Organização das Nações Unidas (ONU) foi fundada em:", opcoes: ["1919, após a Primeira Guerra Mundial", "1945, após a Segunda Guerra Mundial", "1957, com o Tratado de Roma", "1991, após a Guerra Fria"], correta: 1, explicacao: "A ONU foi fundada em 1945, substituindo a antiga Sociedade das Nações, para promover paz e cooperação internacional." },
        { enunciado: "O Acordo de Bicesse (1991) relacionou-se com:", opcoes: ["A independência de Angola", "Um processo de paz entre o Governo angolano e a UNITA", "A adesão de Angola à ONU", "A criação da moeda nacional"], correta: 1, explicacao: "O Acordo de Bicesse, assinado em Portugal em 1991, estabeleceu um processo de paz e eleições multipartidárias em Angola." },
        { enunciado: "A União Africana (UA), sucessora da antiga Organização de Unidade Africana (OUA), tem sede em:", opcoes: ["Nairóbi, Quénia", "Adis Abeba, Etiópia", "Joanesburgo, África do Sul", "Cairo, Egito"], correta: 1, explicacao: "A sede da União Africana localiza-se em Adis Abeba, capital da Etiópia." },
        { enunciado: "O 4 de abril, em Angola, assinala:", opcoes: ["O Dia da Independência", "O fim da guerra civil, em 2002", "O Dia da Juventude", "A criação do MPLA"], correta: 1, explicacao: "A 4 de abril de 2002 foi assinado o Memorando de Entendimento que pôs fim à guerra civil angolana." },
        { enunciado: "Na frase 'Chamei-o, mas ele não me ouviu', a conjunção 'mas' liga duas orações estabelecendo uma relação de:", opcoes: ["Adição", "Oposição/adversidade", "Causa", "Finalidade"], correta: 1, explicacao: "'Mas' é conjunção coordenativa adversativa, exprimindo oposição entre as duas orações." },
        { enunciado: "O plural de 'cônsul' é:", opcoes: ["Cônsules", "Cônsuls", "Consulados", "Cônsulos"], correta: 0, explicacao: "O plural de 'cônsul' é 'cônsules', seguindo a regra dos nomes terminados em 'l' precedido de vogal tónica com deslocação de acento." },
        { enunciado: "Na frase 'Há dez anos que não o via', a forma verbal 'há' está correta porque:", opcoes: ["É uma forma do verbo 'haver', impessoal, indicando tempo decorrido", "É uma preposição", "Deveria ser substituída por 'à'", "É uma interjeição"], correta: 0, explicacao: "'Há', do verbo haver, é impessoal quando indica tempo decorrido, ficando sempre na 3.ª pessoa do singular." },
        { enunciado: "A figura de linguagem em 'exército de formigas invadiu a cozinha' é:", opcoes: ["Hipérbole", "Metáfora", "Antítese", "Onomatopeia"], correta: 1, explicacao: "Há uma comparação implícita entre o grupo de formigas e um exército, sem uso de conectivo comparativo — metáfora." },
        { enunciado: "Assinale a frase corretamente pontuada quanto ao uso do aposto:", opcoes: ["Luanda capital de Angola é uma cidade costeira.", "Luanda, capital de Angola, é uma cidade costeira.", "Luanda capital, de Angola é uma cidade, costeira.", "Luanda; capital de Angola; é uma cidade costeira."], correta: 1, explicacao: "O aposto explicativo 'capital de Angola' deve ser isolado por vírgulas." },
        { enunciado: "Em 'Chegou tarde, apesar de ter saído cedo', a oração destacada expressa uma relação de:", opcoes: ["Causa", "Concessão", "Consequência", "Finalidade"], correta: 1, explicacao: "'Apesar de' introduz oração subordinada concessiva, indicando um obstáculo que não impediu o resultado." },
        { enunciado: "O uso correto da vírgula antes de 'e' é aceitável quando:", opcoes: ["Nunca é aceitável em nenhum caso", "As orações ligadas por 'e' têm sujeitos diferentes ou a oração é longa, evitando ambiguidade", "Sempre que se quiser, sem qualquer regra", "Apenas em poesia"], correta: 1, explicacao: "A vírgula antes de 'e' pode ser usada quando as orações têm sujeitos distintos ou por razões de clareza em frases longas." },
        { enunciado: "A palavra 'perspicaz' pertence à classe gramatical de:", opcoes: ["Substantivo", "Adjetivo", "Advérbio", "Verbo"], correta: 1, explicacao: "'Perspicaz' é adjetivo, pois qualifica um substantivo (ex: pessoa perspicaz)." },
        { enunciado: "A Guerra dos Cem Anos (1337-1453) foi travada principalmente entre:", opcoes: ["Espanha e Portugal", "Inglaterra e França", "Alemanha e Rússia", "Itália e Áustria"], correta: 1, explicacao: "A Guerra dos Cem Anos opôs o Reino de Inglaterra e o Reino de França pela sucessão ao trono francês." },
        { enunciado: "O Renascimento, movimento cultural que floresceu sobretudo na Itália a partir do século XIV, caracterizou-se por:", opcoes: ["Rejeição total da cultura clássica greco-romana", "Valorização do humanismo, da razão e do resgate dos valores clássicos greco-romanos", "Isolamento cultural total da Europa", "Foco exclusivo em temas religiosos medievais"], correta: 1, explicacao: "O Renascimento valorizou o humanismo, a razão e o resgate estético e filosófico da Antiguidade Clássica." },
        { enunciado: "A Segunda Guerra Mundial (1939-1945) teve início formal com:", opcoes: ["O ataque a Pearl Harbor", "A invasão da Polónia pela Alemanha nazi", "A queda de Berlim", "A criação da ONU"], correta: 1, explicacao: "A invasão da Polónia pela Alemanha, em setembro de 1939, marcou o início formal da Segunda Guerra Mundial na Europa." },
        { enunciado: "O Holocausto, durante a Segunda Guerra Mundial, refere-se ao(à):", opcoes: ["Extermínio sistemático de judeus e outras minorias pelo regime nazi", "Uma batalha naval no Pacífico", "Um tratado de paz assinado em 1945", "A independência da Índia"], correta: 0, explicacao: "O Holocausto foi o extermínio sistemático de cerca de seis milhões de judeus e outras minorias pelo regime nazi." },
        { enunciado: "A Revolução Chinesa de 1949, liderada por Mao Zedong, resultou na:", opcoes: ["Restauração da monarquia chinesa", "Proclamação da República Popular da China, sob regime comunista", "Independência de Hong Kong", "Aliança imediata com os Estados Unidos"], correta: 1, explicacao: "A vitória comunista na guerra civil chinesa levou à proclamação da República Popular da China em 1949." },
        { enunciado: "O Império Romano do Ocidente entrou em colapso, tradicionalmente, no ano de:", opcoes: ["476 d.C.", "1453 d.C.", "1000 d.C.", "800 d.C."], correta: 0, explicacao: "A queda de Rómulo Augusto em 476 d.C. é tradicionalmente apontada como o fim do Império Romano do Ocidente." },
        { enunciado: "A Guerra da Independência dos Estados Unidos (1775-1783) resultou na:", opcoes: ["Manutenção do domínio britânico", "Independência das Treze Colónias britânicas na América do Norte", "Anexação do Canadá", "Criação da União Europeia"], correta: 1, explicacao: "A guerra culminou na independência das Treze Colónias, dando origem aos Estados Unidos da América." },
        { enunciado: "A descolonização africana ocorreu, na sua maioria, principalmente durante:", opcoes: ["O século XIX", "As décadas de 1950 a 1970 do século XX", "O século XVIII", "A Idade Média"], correta: 1, explicacao: "A maioria dos países africanos alcançou a independência entre as décadas de 1950 e 1970 do século XX." },
        { enunciado: "A Convenção de Genebra relaciona-se historicamente com:", opcoes: ["O comércio internacional de bens", "As normas de Direito Internacional Humanitário aplicáveis a conflitos armados", "A criação da União Europeia", "A colonização de África"], correta: 1, explicacao: "As Convenções de Genebra estabelecem normas de Direito Internacional Humanitário para proteção de vítimas de conflitos armados." },
        { enunciado: "O sistema das Nações Unidas atribui ao Conselho de Segurança a responsabilidade principal por:", opcoes: ["Questões exclusivamente económicas", "A manutenção da paz e segurança internacionais", "A gestão do desporto mundial", "A regulação do comércio bilateral"], correta: 1, explicacao: "O Conselho de Segurança da ONU tem responsabilidade primária pela manutenção da paz e segurança internacionais." },
        { enunciado: "A Comunidade dos Países de Língua Portuguesa (CPLP) foi fundada com o objetivo principal de:", opcoes: ["Promover cooperação política, económica e cultural entre países lusófonos", "Substituir a ONU nos países membros", "Ser um bloco militar exclusivo", "Unificar moedas nacionais"], correta: 0, explicacao: "A CPLP promove cooperação política, económica, social e cultural entre os países de língua oficial portuguesa." },
        { enunciado: "O Movimento Popular de Libertação de Angola (MPLA) foi fundado, historicamente, com o objetivo de:", opcoes: ["Manter o domínio colonial português", "Lutar pela independência de Angola face ao colonialismo português", "Promover o comércio com o Brasil", "Ser um clube desportivo"], correta: 1, explicacao: "O MPLA foi um dos principais movimentos de libertação nacional que lutou pela independência de Angola." },
        { enunciado: "A crise do petróleo de 1973 teve como principal causa imediata:", opcoes: ["Uma pandemia global", "O embargo petrolífero imposto pelos países árabes da OPEP na sequência da Guerra do Yom Kippur", "A queda do Muro de Berlim", "A criação da União Europeia"], correta: 1, explicacao: "O embargo da OPEP, em resposta ao apoio ocidental a Israel na Guerra do Yom Kippur, provocou a crise petrolífera de 1973." },
        { enunciado: "Na frase 'Foi você quem resolveu o caso', a concordância verbal correta admite também a forma:", opcoes: ["'Foi você quem resolveste o caso' (concordância obrigatória com 'você')", "'Foi você quem resolveu o caso', mantendo o verbo 'resolver' na 3.ª pessoa, concordando com 'quem'", "Nenhuma das formas está correta", "O verbo deve ficar sempre no plural"], correta: 1, explicacao: "Com o pronome relativo 'quem', o verbo pode concordar com ele na 3.ª pessoa do singular, mesmo referindo-se a 'você'." },
        { enunciado: "O 'eufemismo', enquanto figura de linguagem, tem como função principal:", opcoes: ["Tornar uma ideia mais dura e ofensiva", "Suavizar uma ideia desagradável ou chocante através de uma expressão mais branda", "Repetir a mesma palavra várias vezes", "Inverter o sentido literal de uma frase"], correta: 1, explicacao: "O eufemismo substitui uma expressão dura ou desagradável por outra mais suave (ex: 'faleceu' em vez de 'morreu')." },
        { enunciado: "O Tratado de Versalhes (1919), que encerrou formalmente a Primeira Guerra Mundial, é frequentemente apontado como um dos fatores que contribuíram para:", opcoes: ["A estabilidade duradoura na Europa", "O ressentimento alemão e, indiretamente, a ascensão do nazismo", "A independência dos Estados Unidos", "A criação imediata da ONU"], correta: 1, explicacao: "As duras condições impostas à Alemanha pelo Tratado de Versalhes alimentaram o ressentimento nacional, explorado pela propaganda nazi." },
        { enunciado: "A Conferência de Ialta (1945), reunindo Churchill, Roosevelt e Estaline, discutiu essencialmente:", opcoes: ["A reorganização do mundo pós-Segunda Guerra Mundial", "A independência da Índia", "O comércio de especiarias", "A criação da União Europeia"], correta: 0, explicacao: "A Conferência de Ialta definiu aspetos-chave da reorganização política do mundo após a Segunda Guerra Mundial." },
        { enunciado: "O apartheid, sistema de segregação racial vigente na África do Sul até à década de 1990, foi oficialmente abolido sob a liderança política associada a:", opcoes: ["Nelson Mandela e F. W. de Klerk", "Winston Churchill", "Charles de Gaulle", "Mahatma Gandhi"], correta: 0, explicacao: "O fim do apartheid está associado ao processo negocial entre Nelson Mandela e F. W. de Klerk, culminando nas eleições de 1994." },
        { enunciado: "A expressão 'Terceiro Mundo', cunhada durante a Guerra Fria, referia-se originalmente a:", opcoes: ["Países alinhados com os Estados Unidos", "Países que não se alinhavam nem com o bloco capitalista nem com o bloco comunista", "Apenas países europeus", "Países exportadores de petróleo"], correta: 1, explicacao: "'Terceiro Mundo' designava originalmente os países não alinhados com nenhum dos dois blocos da Guerra Fria (EUA e URSS)." },
        { enunciado: "A oração 'Como estava a chover, ficámos em casa' apresenta uma relação de:", opcoes: ["Concessão", "Causa", "Finalidade", "Condição"], correta: 1, explicacao: "'Como', neste contexto inicial, introduz oração subordinada causal, indicando a razão do facto seguinte." },
        { enunciado: "Sócrates, considerado um dos fundadores da filosofia ocidental, viveu aproximadamente entre:", opcoes: ["470-399 a.C.", "384-322 a.C.", "450-404 a.C.", "356-323 a.C."], correta: 0, explicacao: "Sócrates viveu c. 470-399 a.C., tendo sido condenado à morte em Atenas, acusado de corromper a juventude e não respeitar os deuses da cidade." },
        { enunciado: "Aristóteles, discípulo de Platão e mais tarde preceptor de Alexandre, o Grande, nasceu e morreu, respetivamente, em:", opcoes: ["384 a.C. e 322 a.C.", "470 a.C. e 399 a.C.", "450 a.C. e 404 a.C.", "551 a.C. e 479 a.C."], correta: 0, explicacao: "Aristóteles nasceu em 384 a.C. em Estagira e morreu em 322 a.C., sendo discípulo de Platão e preceptor de Alexandre Magno." },
        { enunciado: "Tucídides, autor da 'História da Guerra do Peloponeso' e considerado um dos fundadores da historiografia científica, viveu aproximadamente entre:", opcoes: ["460-400 a.C.", "384-322 a.C.", "470-399 a.C.", "356-323 a.C."], correta: 0, explicacao: "Tucídides (c. 460-400 a.C.) narrou a Guerra do Peloponeso com método baseado na análise crítica de fontes, sendo considerado precursor da historiografia científica." },
        { enunciado: "Xenofonte, historiador e general ateniense, autor da obra 'Anábase' (relato da retirada dos 'Dez Mil'), foi também discípulo de:", opcoes: ["Aristóteles", "Sócrates", "Alcibíades", "Péricles"], correta: 1, explicacao: "Xenofonte (c. 430-354 a.C.) foi discípulo de Sócrates e autor de obras históricas e filosóficas, incluindo a 'Anábase' e as 'Memoráveis'." },
        { enunciado: "Alcibíades, estratego e político ateniense, amigo e discípulo de Sócrates, que trocou de aliança entre Atenas e Esparta durante a Guerra do Peloponeso, viveu entre:", opcoes: ["450-404 a.C.", "470-399 a.C.", "384-322 a.C.", "356-323 a.C."], correta: 0, explicacao: "Alcibíades (c. 450-404 a.C.) foi um brilhante mas controverso estratego ateniense, célebre pelas suas mudanças de aliança durante a Guerra do Peloponeso." },
        { enunciado: "Vladimir Ilitch Lenine, líder da Revolução Russa de 1917 e fundador do Estado soviético, nasceu e morreu, respetivamente, em:", opcoes: ["1870 e 1924", "1878 e 1953", "1894 e 1971", "1889 e 1945"], correta: 0, explicacao: "Lenine nasceu em 1870 e morreu em 1924, tendo liderado a Revolução de Outubro e fundado a URSS." },
        { enunciado: "Josef Estaline, que sucedeu a Lenine na liderança da União Soviética, nasceu e morreu, respetivamente, em:", opcoes: ["1870 e 1924", "1878 e 1953", "1894 e 1971", "1883 e 1936"], correta: 1, explicacao: "Estaline nasceu em 1878 e morreu em 1953, tendo liderado a URSS durante quase três décadas após a morte de Lenine." },
        { enunciado: "Nikita Khrushchev, que liderou a URSS após a morte de Estaline e promoveu o processo de 'desestalinização', nasceu e morreu, respetivamente, em:", opcoes: ["1870 e 1924", "1878 e 1953", "1894 e 1971", "1906 e 1982"], correta: 2, explicacao: "Nikita Khrushchev nasceu em 1894 e morreu em 1971, tendo liderado a URSS entre 1953 e 1964 e promovido a desestalinização." },
        { enunciado: "Gavrilo Princip, o jovem nacionalista sérvio-bósnio cujo atentado desencadeou a Primeira Guerra Mundial, assassinou em Sarajevo, em 1914, a figura de:", opcoes: ["O Czar Nicolau II da Rússia", "O Arquiduque Francisco Ferdinando, herdeiro do trono Austro-Húngaro", "O Kaiser Guilherme II da Alemanha", "O Rei Jorge V do Reino Unido"], correta: 1, explicacao: "Gavrilo Princip assassinou o Arquiduque Francisco Ferdinando e a sua esposa em Sarajevo, a 28 de junho de 1914, estopim imediato da Primeira Guerra Mundial." },
        { enunciado: "Gavrilo Princip, autor do atentado de Sarajevo, nasceu em 1894 e morreu, ainda jovem, em:", opcoes: ["1914, executado no local do atentado", "1918, na prisão, vítima de tuberculose", "1939, no início da Segunda Guerra Mundial", "1953, já em liberdade"], correta: 1, explicacao: "Por ser menor de idade à data do atentado, Gavrilo Princip não foi condenado à morte, mas morreu na prisão em 1918, vítima de tuberculose." },
        { enunciado: "O 'asiento', figura histórica ligada ao comércio colonial entre os séculos XVI e XVIII, consistia em:", opcoes: ["Um imposto cobrado sobre a produção agrícola nas colónias", "Uma licença/contrato real que autorizava o fornecimento de pessoas escravizadas africanas às colónias espanholas na América", "Um tratado de paz entre Portugal e Espanha", "Um sistema de correios entre a Europa e as colónias"], correta: 1, explicacao: "O asiento era um contrato/licença concedido pela coroa espanhola, autorizando determinada nação ou companhia a fornecer escravizados africanos às suas colónias americanas." },
        { enunciado: "O chamado 'telefone vermelho', criado em 1963 na sequência da Crise dos Mísseis de Cuba, consistia em:", opcoes: ["Um telefone literalmente vermelho colocado na Casa Branca", "Uma linha direta de comunicação (inicialmente por telex, não por voz) entre Washington e Moscovo, para gerir crises com rapidez", "Uma rede de espionagem soviética nos EUA", "Um código secreto usado apenas pela CIA"], correta: 1, explicacao: "Apesar do nome popular, o 'telefone vermelho' não era, na origem, nem telefone nem vermelho — era uma linha de telex direta entre as duas capitais, criada após a Crise dos Mísseis de Cuba (1962) para evitar mal-entendidos em situações de crise." },
        { enunciado: "A expressão 'Cortina de Ferro', popularizada por Winston Churchill num discurso de 1946, referia-se a:", opcoes: ["Uma barreira física construída ao longo de toda a fronteira da URSS", "A divisão política e ideológica entre a Europa Ocidental (capitalista) e a Europa de Leste sob influência soviética", "Um tratado comercial entre países europeus", "O nome de uma operação militar da Segunda Guerra Mundial"], correta: 1, explicacao: "A 'Cortina de Ferro' foi uma expressão simbólica (não uma estrutura física única) para a divisão ideológica e política entre o bloco ocidental e o bloco soviético durante a Guerra Fria." },
        { enunciado: "Assinale a frase em que a figura de linguagem 'hipérbole' está corretamente identificada:", opcoes: ["'Estou morto de fome' — exagero intencional para intensificar o efeito expressivo", "'O tempo é dinheiro' — comparação implícita entre dois elementos", "'As ondas dançavam no mar' — atribuição de características humanas a algo não humano", "'Choveu canivetes' — substituição de um termo por outro com o qual mantém relação lógica"], correta: 0, explicacao: "A hipérbole é o exagero intencional para dar mais força expressiva à ideia ('morto de fome' não é literal, é exagero)." },
        { enunciado: "Em 'As ondas dançavam suavemente sobre as rochas', a figura de linguagem presente é:", opcoes: ["Metonímia", "Personificação (prosopopeia)", "Hipérbole", "Eufemismo"], correta: 1, explicacao: "Atribuir a ação humana de 'dançar' às ondas é personificação (prosopopeia) — dar características humanas a seres ou coisas não humanas." },
        { enunciado: "A expressão 'ler Camões' (referindo-se à leitura das obras do autor) é um exemplo de:", opcoes: ["Metonímia (o autor pelo nome designa a sua obra)", "Antítese", "Hipérbato", "Eufemismo"], correta: 0, explicacao: "É metonímia quando se usa o nome do autor para designar a sua obra — 'ler Camões' significa ler as obras de Camões." },
        { enunciado: "Na frase 'Era um mar de gente na manifestação', a figura de linguagem usada é:", opcoes: ["Hipérbole, pelo exagero da quantidade de pessoas comparada a um mar", "Ironia", "Elipse", "Anáfora"], correta: 0, explicacao: "Comparar a multidão a 'um mar de gente' é uma hipérbole, exagerando a ideia de grande quantidade." },
        { enunciado: "A frase 'Que belo trabalho!', dita ironicamente perante um erro evidente, exemplifica a figura de linguagem de:", opcoes: ["Metáfora", "Ironia — dizer o contrário do que se pensa, com intenção crítica ou humorística", "Hipérbato", "Onomatopeia"], correta: 1, explicacao: "A ironia consiste em dizer o oposto do que realmente se pensa, geralmente com intenção crítica, sarcástica ou humorística." },
        { enunciado: "Em 'Tic-tac, tic-tac, o relógio marcava as horas', a figura de linguagem presente é:", opcoes: ["Onomatopeia — reprodução de um som através da palavra", "Antítese", "Gradação", "Catacrese"], correta: 0, explicacao: "A onomatopeia reproduz, através de palavras, um som real ('tic-tac' imita o som do relógio)." },
        { enunciado: "Na frase 'Uns choram a morte, outros riem de alegria', a figura de linguagem em destaque é:", opcoes: ["Antítese — aproximação de ideias opostas", "Metonímia", "Aliteração", "Pleonasmo"], correta: 0, explicacao: "A antítese aproxima ideias opostas ('choram' vs. 'riem'; 'morte' vs. 'alegria') para criar um efeito de contraste." },
        { enunciado: "Em 'Vi com os meus próprios olhos', a expressão sublinhada constitui um exemplo de:", opcoes: ["Pleonasmo — redundância expressiva usada para reforçar a ideia", "Metáfora", "Elipse", "Hipérbato"], correta: 0, explicacao: "O pleonasmo é a repetição de uma ideia já implícita, usada intencionalmente para reforçar a expressão ('ver com os olhos' já é implícito no verbo 'ver')." },
        { enunciado: "A Guerra dos Trinta Anos (1618-1648), um dos maiores conflitos religiosos e políticos da Europa moderna, terminou com a assinatura de que tratado?", opcoes: ["Tratado de Versalhes", "Paz de Vestfália", "Tratado de Utrecht", "Congresso de Viena"], correta: 1, explicacao: "A Paz de Vestfália (1648) encerrou a Guerra dos Trinta Anos e é considerada um marco na formação do sistema de Estados soberanos modernos." },
        { enunciado: "O Congresso de Viena (1814-1815), reunido após as Guerras Napoleónicas, teve como principal objetivo:", opcoes: ["Iniciar uma nova guerra europeia", "Reorganizar o mapa político da Europa e restaurar o equilíbrio de poder entre as potências", "Abolir todas as monarquias europeias", "Criar a União Europeia"], correta: 1, explicacao: "O Congresso de Viena reorganizou as fronteiras europeias após a queda de Napoleão, procurando restabelecer o equilíbrio de poder entre as grandes potências." },
        { enunciado: "A expressão 'Guerra Fria' é geralmente atribuída à popularização feita pelo jornalista/escritor:", opcoes: ["George Orwell", "Winston Churchill", "Ernest Hemingway", "Mark Twain"], correta: 0, explicacao: "Embora a expressão tenha sido usada antes, é frequentemente atribuída à popularização por George Orwell, num ensaio de 1945." },
        { enunciado: "A 'Perestroika' e a 'Glasnost', políticas associadas a Mikhail Gorbachev na URSS na década de 1980, significavam respetivamente:", opcoes: ["Guerra e paz", "Reestruturação económica e transparência/abertura política", "Censura e repressão", "Nomes de mísseis nucleares soviéticos"], correta: 1, explicacao: "A Perestroika (reestruturação económica) e a Glasnost (transparência/abertura) foram reformas de Gorbachev que contribuíram para o fim da URSS." },
        { enunciado: "Um 'armistício', em contexto de guerra, distingue-se de um 'tratado de paz' porque:", opcoes: ["São exatamente a mesma coisa", "O armistício é um acordo para cessar as hostilidades militares, sem necessariamente resolver definitivamente o conflito; o tratado de paz encerra-o formalmente", "O armistício só pode ser assinado por civis", "O tratado de paz sempre antecede o armistício"], correta: 1, explicacao: "O armistício suspende as hostilidades militares; a resolução política e jurídica definitiva do conflito costuma vir com um tratado de paz posterior." }
      ]}
    ]
  },
  {
    id: "med",
    codigo: "MED-01",
    titulo: "Ministério da Educação",
    subtitulo: "Magistério Primário e docência por disciplina (1.º/2.º ciclo) — meta: 50 questões/disciplina",
    accent: "#3E5C7A",
    disciplinas: [
      { id: "magisterio-primario", nome: "Magistério Primário (Português + Matemática + Metodologias + Cultura Geral)", questoes: [
        { enunciado: "No ensino da leitura no 1.º ciclo, o método fónico/sintético baseia-se principalmente em:", opcoes: ["Partir do texto completo para depois identificar letras", "Ensinar primeiro os sons das letras e sílabas, construindo depois palavras", "Memorizar textos inteiros sem decompor sons", "Ignorar a correspondência entre som e letra"], correta: 1, explicacao: "O método fónico ensina primeiro a correspondência som-letra, avançando depois para sílabas e palavras." },
        { enunciado: "Na frase 'O menino, que estava cansado, adormeceu', a vírgula antes e depois de 'que estava cansado' serve para:", opcoes: ["Separar sujeito e predicado sempre", "Isolar uma oração explicativa intercalada", "Indicar uma enumeração", "Substituir dois pontos"], correta: 1, explicacao: "As vírgulas isolam a oração adjetiva explicativa, que acrescenta uma informação extra sobre 'o menino'." },
        { enunciado: "Um substantivo coletivo, como 'cardume' ou 'enxame', designa:", opcoes: ["Um único ser de grande porte", "Um conjunto de seres da mesma espécie", "Uma qualidade abstrata", "Uma ação verbal"], correta: 1, explicacao: "Substantivos coletivos designam, no singular, um conjunto de seres da mesma espécie." },
        { enunciado: "No ensino da escrita a crianças do 1.º ciclo, a consciência fonológica refere-se à capacidade de:", opcoes: ["Escrever rapidamente", "Perceber e manipular os sons da fala (sílabas, rimas, fonemas)", "Decorar o alfabeto sem compreender sons", "Copiar textos sem erros ortográficos"], correta: 1, explicacao: "Consciência fonológica é a capacidade de identificar e manipular unidades sonoras da língua, essencial à alfabetização." },
        { enunciado: "Na frase 'Os meninos brincam no pátio', o predicado é classificado como:", opcoes: ["Nominal", "Verbal", "Verbo-nominal", "Inexistente"], correta: 1, explicacao: "O predicado é verbal porque o núcleo informativo está no verbo de ação 'brincam'." },
        { enunciado: "No 1.º ciclo, o ensino do sistema de numeração decimal deve começar por trabalhar principalmente:", opcoes: ["Operações com frações complexas", "O valor posicional dos algarismos (unidades, dezenas, centenas)", "Equações do segundo grau", "Geometria analítica"], correta: 1, explicacao: "A base do sistema decimal no 1.º ciclo é a compreensão do valor posicional dos algarismos." },
        { enunciado: "A propriedade comutativa da adição estabelece que:", opcoes: ["A ordem das parcelas altera o resultado", "A ordem das parcelas não altera o resultado (a+b = b+a)", "Só se aplica à multiplicação", "É válida apenas para números negativos"], correta: 1, explicacao: "A propriedade comutativa diz que a soma não depende da ordem das parcelas." },
        { enunciado: "Numa turma de 30 alunos, 12 são raparigas. Que fração da turma representam os rapazes?", opcoes: ["12/30", "18/30", "30/12", "12/18"], correta: 1, explicacao: "Se 12 são raparigas, os rapazes são 30-12=18, logo a fração é 18/30." },
        { enunciado: "No ensino de geometria básica, um polígono com 4 lados e 4 ângulos rectos e lados iguais chama-se:", opcoes: ["Triângulo", "Quadrado", "Pentágono", "Losango"], correta: 1, explicacao: "O quadrado é o quadrilátero com quatro lados iguais e quatro ângulos rectos." },
        { enunciado: "Numa didática ativa da matemática no ensino primário, o uso do material manipulável serve sobretudo para:", opcoes: ["Substituir totalmente o cálculo mental", "Concretizar conceitos abstratos antes da simbolização numérica", "Ocupar o tempo de aula", "Avaliar exclusivamente a caligrafia"], correta: 1, explicacao: "O material manipulável ajuda a criança a construir conceitos matemáticos abstratos a partir de experiências concretas." },
        { enunciado: "A abordagem comunicativa no ensino da Língua Portuguesa privilegia:", opcoes: ["Apenas a memorização de regras gramaticais isoladas", "O uso da língua em situações reais de comunicação, integrando as quatro competências", "Exclusivamente exercícios de cópia", "A tradução simultânea para outra língua"], correta: 1, explicacao: "A abordagem comunicativa foca o uso funcional da língua em contextos reais." },
        { enunciado: "Na planificação de uma aula de leitura, a fase de 'pré-leitura' tem como principal objetivo:", opcoes: ["Corrigir erros ortográficos do texto", "Ativar conhecimentos prévios e motivar os alunos para o texto", "Avaliar sumativamente o aluno", "Substituir a leitura do texto"], correta: 1, explicacao: "A pré-leitura prepara o aluno, ativando conhecimento prévio antes do contacto com o texto." },
        { enunciado: "O erro ortográfico de um aluno do 1.º ciclo deve ser tratado pelo professor, do ponto de vista metodológico, como:", opcoes: ["Um sinal de incapacidade permanente", "Uma etapa natural do processo de aprendizagem, a trabalhar com estratégias adequadas", "Motivo de punição", "Algo a ignorar sempre"], correta: 1, explicacao: "Erros ortográficos nas fases iniciais são naturais e devem orientar a intervenção pedagógica." },
        { enunciado: "A leitura em voz alta feita pelo professor, com entoação e ritmo adequados, contribui principalmente para:", opcoes: ["Substituir a necessidade de o aluno aprender a ler", "Modelar a fluência e a compreensão leitora", "Avaliar formalmente o aluno", "Ensinar apenas vocabulário técnico"], correta: 1, explicacao: "A leitura modelada pelo professor serve de referência de fluência e compreensão." },
        { enunciado: "O erro de um aluno ao resolver uma operação deve, do ponto de vista metodológico, ser interpretado como:", opcoes: ["Prova de que o aluno não tem capacidade para a matemática", "Uma fonte de informação sobre o raciocínio do aluno, útil para reorientar o ensino", "Algo irrelevante para o professor", "Motivo para avançar sem rever o conteúdo"], correta: 1, explicacao: "A análise do erro revela o raciocínio do aluno e orienta a intervenção pedagógica." },
        { enunciado: "A resolução de problemas no ensino da matemática do 1.º ciclo deve, preferencialmente:", opcoes: ["Ser evitada até ao 2.º ciclo", "Partir de situações do quotidiano da criança", "Usar exclusivamente números muito grandes", "Ser feita sem qualquer contexto"], correta: 1, explicacao: "Problemas contextualizados no quotidiano tornam a aprendizagem significativa." },
        { enunciado: "O cálculo mental, como estratégia metodológica, contribui essencialmente para:", opcoes: ["Substituir totalmente o cálculo escrito", "Desenvolver a flexibilidade e o sentido de número", "Ser usado apenas em avaliações finais", "Evitar o uso de material manipulável"], correta: 1, explicacao: "O cálculo mental desenvolve o sentido de número e a flexibilidade de estratégias." },
        { enunciado: "Ao introduzir a noção de fração no 1.º ciclo, a abordagem metodológica mais recomendada começa por:", opcoes: ["Definições formais e algoritmos abstratos", "Situações concretas de partilha equitativa (ex: dividir uma pizza)", "Equações algébricas", "Fórmulas de área e perímetro"], correta: 1, explicacao: "Situações concretas de partilha ajudam a criança a construir o significado de fração." },
        { enunciado: "A independência de Angola foi proclamada em:", opcoes: ["4 de fevereiro de 1961", "11 de novembro de 1975", "25 de abril de 1974", "27 de maio de 1977"], correta: 1, explicacao: "Angola tornou-se independente de Portugal a 11 de novembro de 1975." },
        { enunciado: "A capital de Angola é:", opcoes: ["Huambo", "Luanda", "Benguela", "Lubango"], correta: 1, explicacao: "Luanda é a capital e maior cidade de Angola." },
        { enunciado: "Na frase 'Os professores, que se dedicam aos alunos, merecem reconhecimento', a oração destacada é:", opcoes: ["Subordinada substantiva", "Subordinada adjetiva explicativa", "Coordenada sindética", "Subordinada adverbial condicional"], correta: 1, explicacao: "A oração 'que se dedicam aos alunos' explica o sujeito 'professores', isolada por vírgulas — é adjetiva explicativa." },
        { enunciado: "O plural de 'lápis' é:", opcoes: ["Lápis (invariável)", "Lápises", "Lápizes", "Lápi"], correta: 0, explicacao: "Palavras terminadas em '-is' átono, como 'lápis', são invariáveis no plural." },
        { enunciado: "Numa turma, cada aluno tem 8 lápis. Se a turma tem 24 alunos, quantos lápis existem ao todo?", opcoes: ["162", "182", "192", "202"], correta: 2, explicacao: "24 × 8 = 192 lápis." },
        { enunciado: "A subtração 500 - 235 é igual a:", opcoes: ["255", "265", "275", "285"], correta: 1, explicacao: "500 - 235 = 265." },
        { enunciado: "Na metodologia de ensino, a 'avaliação formativa' distingue-se da 'avaliação sumativa' porque:", opcoes: ["São exatamente a mesma coisa", "A formativa acompanha o processo de aprendizagem para o reorientar; a sumativa mede o resultado final", "A sumativa ocorre sempre antes da formativa", "A formativa não tem qualquer utilidade pedagógica"], correta: 1, explicacao: "A avaliação formativa acompanha e reorienta o processo de aprendizagem; a sumativa avalia o resultado final, geralmente com uma nota." },
        { enunciado: "No planeamento de uma aula, os 'objetivos de aprendizagem' devem, preferencialmente, ser:", opcoes: ["Vagos e genéricos", "Claros, específicos e observáveis no comportamento do aluno", "Decididos apenas no fim da aula", "Iguais para todas as disciplinas, sem adaptação"], correta: 1, explicacao: "Objetivos de aprendizagem eficazes são claros, específicos e permitem observar se foram atingidos." },
        { enunciado: "A 'diferenciação pedagógica' na sala de aula consiste em:", opcoes: ["Tratar todos os alunos de forma idêntica, sem exceção", "Adaptar estratégias de ensino às diferentes necessidades e ritmos de aprendizagem dos alunos", "Separar fisicamente os alunos com mais dificuldades", "Ser aplicada apenas no ensino especial"], correta: 1, explicacao: "A diferenciação pedagógica adapta o ensino às diferentes necessidades, ritmos e estilos de aprendizagem dos alunos de uma turma." },
        { enunciado: "O Império do Mali, um dos grandes impérios da África Ocidental medieval, ficou historicamente associado à riqueza em:", opcoes: ["Petróleo", "Ouro e sal, através do comércio transaariano", "Diamantes exclusivamente", "Especiarias do Oriente"], correta: 1, explicacao: "O Império do Mali enriqueceu através do comércio transaariano de ouro e sal, sendo o imperador Mansa Musa uma figura célebre pela sua riqueza." },
        { enunciado: "A Organização Mundial da Saúde (OMS) e a UNESCO são ambas agências especializadas de que organização internacional?", opcoes: ["União Africana", "Organização das Nações Unidas (ONU)", "União Europeia", "CPLP"], correta: 1, explicacao: "Tanto a OMS (saúde) como a UNESCO (educação, ciência e cultura) são agências especializadas da ONU." },
        { enunciado: "A palavra 'bissexto', usada para referir o ano com 366 dias, tem a sua origem histórica ligada a:", opcoes: ["Uma invenção do século XX", "Uma correção do calendário romano introduzida por Júlio César", "Uma tradição exclusivamente africana", "O calendário chinês"], correta: 1, explicacao: "O ano bissexto tem origem na reforma do calendário juliano, introduzida por Júlio César, para corrigir o desfasamento com o ano solar." },
        { enunciado: "Na Língua Portuguesa, a palavra 'porque' escreve-se junto e sem acento quando:", opcoes: ["Inicia uma pergunta direta", "Introduz uma explicação ou causa, em frases afirmativas ('porque' = conjunção causal)", "Termina uma frase interrogativa", "É usada isoladamente como resposta"], correta: 1, explicacao: "'Porque' junto e sem acento é usado como conjunção causal ou explicativa em frases afirmativas (ex: 'Não fui porque chovia')." },
        { enunciado: "Um terreno retangular tem 12 metros de comprimento e 8 metros de largura. Qual é a sua área?", opcoes: ["20 m²", "40 m²", "96 m²", "100 m²"], correta: 2, explicacao: "Área do retângulo = comprimento × largura = 12 × 8 = 96 m²." },
        { enunciado: "Na abordagem construtivista da aprendizagem, defendida por autores como Piaget, o conhecimento é visto como algo que o aluno:", opcoes: ["Recebe passivamente do professor, sem qualquer elaboração própria", "Constrói ativamente através da interação com o meio e a experiência", "Nunca pode verdadeiramente adquirir", "Aprende exclusivamente por memorização mecânica"], correta: 1, explicacao: "O construtivismo defende que o aluno constrói ativamente o seu conhecimento através da interação com o meio, não apenas o recebe passivamente." },
        { enunciado: "A avaliação diagnóstica, realizada normalmente no início de um período letivo, tem como principal objetivo:", opcoes: ["Atribuir uma nota final ao aluno", "Identificar os conhecimentos prévios e as dificuldades dos alunos antes de iniciar novos conteúdos", "Substituir todas as outras formas de avaliação", "Ser aplicada apenas no final do ano letivo"], correta: 1, explicacao: "A avaliação diagnóstica identifica o ponto de partida dos alunos, permitindo ao professor planear o ensino de forma mais ajustada." }
      ]},
      { id: "doc-lp", nome: "Docência — Língua Portuguesa (1.º/2.º ciclo)", questoes: [
        { enunciado: "Na classificação das orações coordenadas, 'mas' introduz uma oração coordenada:", opcoes: ["Aditiva", "Adversativa", "Conclusiva", "Explicativa"], correta: 1, explicacao: "'Mas' exprime oposição/contraste, característica da coordenação adversativa." },
        { enunciado: "O plural de 'cidadão' é:", opcoes: ["Cidadãos, cidadães ou cidadões (todas aceites)", "Cidadãos", "Cidadães", "Cidadões"], correta: 1, explicacao: "O plural padrão de 'cidadão' na norma culta é 'cidadãos'." },
        { enunciado: "Em 'A casa foi construída pelo pedreiro', a voz verbal é:", opcoes: ["Ativa", "Passiva", "Reflexa", "Impessoal"], correta: 1, explicacao: "O sujeito ('a casa') sofre a ação praticada pelo agente da passiva ('pelo pedreiro') — voz passiva." },
        { enunciado: "A didática da escrita defende que a produção textual deve seguir, preferencialmente, as etapas de:", opcoes: ["Apenas escrever e entregar", "Planificação, textualização e revisão", "Copiar um modelo sem alterações", "Memorizar textos de outros autores"], correta: 1, explicacao: "O processo de escrita eficaz envolve planificação, textualização e revisão do texto produzido." },
        { enunciado: "No ensino do 1.º ciclo, a 'consciência silábica' (capacidade de dividir palavras em sílabas) é considerada uma competência:", opcoes: ["Irrelevante para a alfabetização", "Fundamental, que antecede e apoia a aprendizagem da leitura e escrita", "Exclusiva do 2.º ciclo", "Apenas útil para poesia"], correta: 1, explicacao: "A consciência silábica é uma competência fonológica fundamental que apoia diretamente a aprendizagem da leitura e da escrita." },
        { enunciado: "Na frase 'Vendem-se casas', a partícula 'se' tem valor de:", opcoes: ["Pronome reflexo", "Índice de indeterminação do sujeito/partícula apassivante", "Conjunção condicional", "Advérbio de modo"], correta: 1, explicacao: "Em 'vendem-se casas', o 'se' funciona como partícula apassivante, equivalente a 'as casas são vendidas'." },
        { enunciado: "Um 'texto narrativo' distingue-se de um 'texto descritivo' principalmente porque:", opcoes: ["São exatamente o mesmo tipo de texto", "O narrativo apresenta uma sequência de ações e acontecimentos; o descritivo caracteriza pessoas, lugares ou objetos", "O descritivo tem sempre personagens e enredo", "O narrativo nunca tem personagens"], correta: 1, explicacao: "O texto narrativo desenvolve uma sequência de acontecimentos (enredo); o descritivo foca-se em caracterizar algo ou alguém, sem necessariamente haver ação." },
        { enunciado: "Na avaliação da leitura no 1.º ciclo, a 'fluência leitora' refere-se essencialmente à capacidade de ler:", opcoes: ["Apenas em voz baixa", "Com precisão, velocidade adequada e entoação apropriada", "Sem nunca cometer qualquer hesitação", "Exclusivamente textos poéticos"], correta: 1, explicacao: "A fluência leitora combina precisão, velocidade adequada e entoação (prosódia) na leitura em voz alta." },
        { enunciado: "Em 'Comprei um carro novo, vermelho e muito confortável', os termos sublinhados classificam-se sintaticamente como:", opcoes: ["Predicativos do sujeito", "Adjuntos adnominais (modificadores do nome 'carro')", "Complementos diretos", "Vocativos"], correta: 1, explicacao: "'Novo', 'vermelho' e 'confortável' são adjetivos que modificam o substantivo 'carro', funcionando como adjuntos adnominais." },
        { enunciado: "A didática da oralidade no 1.º/2.º ciclo deve, entre outros objetivos, desenvolver no aluno a capacidade de:", opcoes: ["Falar sem qualquer estrutura ou organização", "Expressar-se de forma clara, organizada e adequada ao contexto comunicativo", "Evitar completamente a participação oral em sala de aula", "Substituir totalmente a escrita"], correta: 1, explicacao: "A didática da oralidade visa desenvolver a expressão oral clara, organizada e adequada às diferentes situações comunicativas." },
        { enunciado: "Na frase 'Estuda, e serás aprovado', a vírgula antes de 'e' justifica-se porque:", opcoes: ["É sempre proibido usar vírgula antes de 'e'", "As duas orações têm sujeitos distintos, o que torna a vírgula aceitável para maior clareza", "É um erro ortográfico grave", "Só se usa em poesia"], correta: 1, explicacao: "Apesar da regra geral evitar vírgula antes de 'e', é aceitável quando as orações ligadas têm sujeitos diferentes, ajudando na clareza da leitura." },
        { enunciado: "O género textual 'carta' (pessoal ou formal) carateriza-se por:", opcoes: ["Não ter destinatário definido", "Ter uma estrutura própria com saudação inicial, corpo do texto e despedida, dirigida a um destinatário específico", "Ser sempre anónimo", "Não poder ser usado em contexto escolar"], correta: 1, explicacao: "A carta tem estrutura própria (saudação, corpo, despedida) e é dirigida a um destinatário específico, real ou fictício." },
        { enunciado: "Ao corrigir a escrita de um aluno do 1.º ciclo, a prática pedagógica mais recomendada é:", opcoes: ["Assinalar todos os erros de uma vez, sem qualquer critério", "Selecionar prioritariamente os erros mais relevantes para o momento de aprendizagem do aluno, evitando desmotivá-lo", "Nunca corrigir para não desmotivar", "Corrigir apenas erros ortográficos, ignorando a coerência do texto"], correta: 1, explicacao: "A correção seletiva, focada no que é mais relevante para o momento de desenvolvimento do aluno, é mais eficaz e menos desmotivadora do que assinalar tudo de uma vez." },
        { enunciado: "Na frase 'Ele mesmo resolveu o problema', a palavra 'mesmo' tem valor de:", opcoes: ["Advérbio de intensidade", "Pronome/expressão de reforço, enfatizando o sujeito", "Conjunção adversativa", "Preposição"], correta: 1, explicacao: "'Mesmo' aqui reforça o sujeito 'ele', enfatizando que foi ele próprio, sem ajuda, quem resolveu o problema." },
        { enunciado: "O uso de dicionários e outros recursos de consulta em sala de aula, no 2.º ciclo, contribui principalmente para:", opcoes: ["Substituir totalmente o professor", "Desenvolver a autonomia do aluno na pesquisa de significados e na correção ortográfica", "Ser desnecessário nesta faixa etária", "Atrasar o ritmo da aula sem qualquer benefício"], correta: 1, explicacao: "O uso de dicionários desenvolve a autonomia do aluno na pesquisa de significados, ortografia e enriquecimento vocabular." },
        { enunciado: "Em 'Chove muito hoje', o sujeito da oração classifica-se como:", opcoes: ["Sujeito simples", "Sujeito composto", "Sujeito indeterminado", "Oração sem sujeito (sujeito inexistente)"], correta: 3, explicacao: "Verbos que exprimem fenómenos meteorológicos, como 'chover', são impessoais e a oração não tem sujeito." },
        { enunciado: "A leitura em voz alta feita periodicamente pelos alunos, com feedback do professor, é uma estratégia que visa principalmente:", opcoes: ["Avaliar apenas a caligrafia", "Desenvolver e monitorizar a fluência e a compreensão leitora ao longo do tempo", "Substituir toda a escrita", "Ser aplicada uma única vez no ano letivo"], correta: 1, explicacao: "A leitura periódica com feedback permite monitorizar a evolução da fluência e compreensão leitora do aluno ao longo do tempo." },
        { enunciado: "Na frase 'Estudei bastante, contudo não fui aprovado', a conjunção 'contudo' introduz uma relação de:", opcoes: ["Adição", "Adversidade/oposição", "Causa", "Conclusão"], correta: 1, explicacao: "'Contudo' é conjunção coordenativa adversativa, indicando contraste entre o esforço e o resultado obtido." },
        { enunciado: "O trabalho com 'famílias de palavras' (ex: 'terra', 'terreno', 'aterrar') no ensino da Língua Portuguesa visa desenvolver:", opcoes: ["Apenas a memorização de listas", "A compreensão da formação de palavras e o enriquecimento do vocabulário do aluno", "Exclusivamente a pontuação", "A caligrafia"], correta: 1, explicacao: "O trabalho com famílias de palavras (mesma raiz) desenvolve a compreensão morfológica e enriquece o vocabulário do aluno." },
        { enunciado: "Em 'O livro que comprei ontem é interessante', a oração 'que comprei ontem' classifica-se como:", opcoes: ["Subordinada adjetiva restritiva", "Subordinada adjetiva explicativa", "Coordenada aditiva", "Subordinada adverbial"], correta: 0, explicacao: "Sem vírgulas a isolá-la, a oração restringe o sentido de 'livro' (especifica qual livro), sendo por isso adjetiva restritiva." },
        { enunciado: "A avaliação da escrita através de 'portefólios' (recolha de textos produzidos ao longo do tempo) permite, sobretudo:", opcoes: ["Avaliar apenas um momento isolado", "Observar a evolução da escrita do aluno ao longo de um período mais alargado", "Substituir toda a avaliação sumativa", "Ser usada apenas no ensino secundário"], correta: 1, explicacao: "O portefólio permite observar a evolução da escrita do aluno ao longo do tempo, complementando avaliações pontuais." },
        { enunciado: "Na frase 'Espero que tenhas sucesso', a locução verbal 'tenhas sucesso' está no:", opcoes: ["Presente do indicativo", "Presente do conjuntivo (subjuntivo)", "Pretérito perfeito", "Futuro do indicativo"], correta: 1, explicacao: "Após 'esperar que', que exprime desejo, usa-se o presente do conjuntivo." },
        { enunciado: "O ensino explícito da ortografia (regras e exceções) no 1.º/2.º ciclo deve, preferencialmente, ser:", opcoes: ["Evitado por completo, deixando o aluno aprender sozinho", "Feito de forma sistemática e contextualizada, associada a atividades de leitura e escrita", "Reduzido a listas de palavras para decorar sem qualquer contexto", "Ensinado apenas uma vez, sem revisão"], correta: 1, explicacao: "O ensino ortográfico eficaz é sistemático, contextualizado e associado a práticas reais de leitura e escrita, não apenas memorização isolada." },
        { enunciado: "Em 'Encontrei-a no mercado', o pronome 'a' desempenha a função sintática de:", opcoes: ["Complemento direto", "Complemento indireto", "Sujeito", "Predicativo do sujeito"], correta: 0, explicacao: "'A' substitui o complemento direto do verbo 'encontrar' (encontrei ela = encontrei-a)." },
        { enunciado: "A técnica de 'leitura partilhada', em que o professor lê em conjunto com os alunos, é especialmente útil no 1.º ciclo para:", opcoes: ["Substituir totalmente a leitura autónoma", "Modelar estratégias de leitura e apoiar alunos com maior dificuldade", "Ser aplicada apenas a alunos avançados", "Avaliar formalmente cada aluno individualmente"], correta: 1, explicacao: "A leitura partilhada modela estratégias de leitura eficazes e apoia, de forma inclusiva, alunos com diferentes níveis de proficiência." },
        { enunciado: "Na frase 'Trabalhador, ele sempre concluiu as suas tarefas', a palavra 'trabalhador' funciona sintaticamente como:", opcoes: ["Predicativo do sujeito, antecipado", "Complemento direto", "Objeto indireto", "Vocativo"], correta: 0, explicacao: "'Trabalhador' caracteriza o sujeito 'ele', funcionando como predicativo do sujeito, mesmo estando deslocado para o início da frase." },
        { enunciado: "O uso de 'histórias em banda desenhada' como recurso didático em Língua Portuguesa contribui, entre outros aspetos, para:", opcoes: ["Substituir totalmente o texto escrito", "Motivar a leitura e trabalhar a compreensão através de uma linguagem visual e textual combinada", "Ser inadequado para o contexto escolar", "Confundir o aluno sem qualquer benefício"], correta: 1, explicacao: "A banda desenhada combina imagem e texto, sendo um recurso motivador para trabalhar compreensão leitora de forma acessível." },
        { enunciado: "Em 'Nem tudo o que reluz é ouro', a expressão é um exemplo de:", opcoes: ["Um provérbio, expressão popular com valor de ensinamento ou sabedoria", "Um erro gramatical comum", "Uma sigla", "Um neologismo"], correta: 0, explicacao: "Trata-se de um provérbio popular, expressão fixa que transmite um ensinamento ou reflexão geral, muito usada na tradição oral." },
        { enunciado: "A distinção entre 'sinónimos' e 'antónimos' assenta em que:", opcoes: ["Sinónimos têm sentidos opostos; antónimos têm sentidos semelhantes", "Sinónimos têm sentidos semelhantes; antónimos têm sentidos opostos", "São exatamente o mesmo conceito", "Aplicam-se apenas a verbos"], correta: 1, explicacao: "Sinónimos são palavras com significados semelhantes; antónimos são palavras com significados opostos." },
        { enunciado: "Na produção de um texto instrucional (ex: uma receita), a característica textual mais marcante é:", opcoes: ["A ausência total de estrutura", "A sequência clara de passos/instruções, geralmente numerados ou ordenados", "A predominância de diálogos", "A ausência de verbos no imperativo"], correta: 1, explicacao: "Textos instrucionais organizam-se numa sequência clara de passos, frequentemente com verbos no imperativo ou infinitivo." },
        { enunciado: "Em 'Fizeram-se muitas promessas naquela campanha', a frase está na voz:", opcoes: ["Ativa", "Passiva pronominal (com 'se')", "Reflexa", "Recíproca"], correta: 1, explicacao: "'Fizeram-se promessas' equivale a 'foram feitas promessas' — trata-se de voz passiva pronominal, construída com o pronome 'se'." },
        { enunciado: "O desenvolvimento do vocabulário através da leitura frequente e diversificada é fundamentado pedagogicamente pela ideia de que:", opcoes: ["A leitura não tem qualquer relação com o vocabulário", "O contacto regular com diferentes textos expõe o aluno a novo vocabulário em contexto, favorecendo a sua retenção", "Só o ensino explícito de listas de palavras é eficaz", "O vocabulário é fixo e não se desenvolve com a leitura"], correta: 1, explicacao: "A exposição regular a diferentes textos permite ao aluno encontrar novo vocabulário em contexto significativo, favorecendo a aprendizagem e retenção." }
      ]},
      { id: "doc-mat", nome: "Docência — Matemática (1.º/2.º ciclo)", questoes: [
        { enunciado: "A resolução da equação 2x + 6 = 14 dá como resultado:", opcoes: ["x = 4", "x = 6", "x = 8", "x = 10"], correta: 0, explicacao: "2x = 14 - 6 = 8, logo x = 8/2 = 4." },
        { enunciado: "O Teorema de Pitágoras aplica-se a:", opcoes: ["Qualquer triângulo", "Triângulos retângulos, relacionando os catetos e a hipotenusa", "Apenas círculos", "Polígonos regulares de 5 lados"], correta: 1, explicacao: "O Teorema de Pitágoras (a² + b² = c²) aplica-se especificamente a triângulos retângulos." },
        { enunciado: "A área de um círculo de raio r é dada pela fórmula:", opcoes: ["2πr", "πr²", "πd", "4πr²"], correta: 1, explicacao: "A área do círculo calcula-se por A = πr², onde r é o raio." },
        { enunciado: "Na didática da matemática, o 'erro de subtração invertida' revela tipicamente:", opcoes: ["Falta total de raciocínio matemático", "Um procedimento sistemático mal compreendido, corrigível com trabalho sobre o reagrupamento", "Um erro aleatório sem padrão", "Que o aluno decorou mal a tabuada"], correta: 1, explicacao: "É um erro procedimental sistemático, associado à dificuldade em compreender o reagrupamento nas colunas da subtração." }
      ]},
      { id: "doc-historia", nome: "Docência — História (1.º/2.º ciclo)", questoes: [
        { enunciado: "O 4 de fevereiro de 1961, em Angola, assinala:", opcoes: ["O início da luta armada de libertação nacional", "A independência de Angola", "A assinatura dos Acordos de Bicesse", "O fim da guerra civil"], correta: 0, explicacao: "A 4 de fevereiro de 1961 é habitualmente assinalada como o início da luta armada de libertação nacional em Angola." },
        { enunciado: "O MPLA, FNLA e UNITA foram, historicamente, os principais:", opcoes: ["Partidos únicos criados após a independência", "Movimentos de libertação nacional angolanos", "Sindicatos coloniais", "Grupos económicos privados"], correta: 1, explicacao: "MPLA, FNLA e UNITA foram os principais movimentos de libertação nacional angolanos na luta anticolonial." },
        { enunciado: "A Conferência de Bandung (1955) é associada historicamente ao surgimento de qual movimento?", opcoes: ["A União Europeia", "O Movimento dos Países Não-Alinhados", "A OTAN", "O Pacto de Varsóvia"], correta: 1, explicacao: "A Conferência de Bandung, entre países afro-asiáticos, é um marco na génese do Movimento dos Não-Alinhados." },
        { enunciado: "Na didática da História, o uso de fontes primárias (documentos de época) tem como principal objetivo pedagógico:", opcoes: ["Substituir o manual escolar totalmente", "Desenvolver o pensamento histórico e crítico do aluno", "Facilitar a memorização de datas", "Reduzir o tempo de aula"], correta: 1, explicacao: "O trabalho com fontes primárias desenvolve competências de análise crítica e pensamento histórico." },
        { enunciado: "No 1.º ciclo, o ensino da História deve, preferencialmente, partir de:", opcoes: ["Conceitos abstratos de cronologia complexa", "Vivências próximas da criança (família, escola, localidade) antes de noções mais distantes", "Datas isoladas sem qualquer contexto", "Textos académicos avançados"], correta: 1, explicacao: "No 1.º ciclo, a História parte do próximo e concreto (família, escola) para o mais distante e abstrato, respeitando o desenvolvimento cognitivo da criança." },
        { enunciado: "A noção de 'tempo histórico', trabalhada nos primeiros anos, distingue-se do tempo cronológico simples porque:", opcoes: ["São exatamente a mesma coisa", "Envolve a compreensão de mudança, continuidade e sucessão de factos ao longo do tempo", "Se refere apenas às horas do relógio", "Não tem qualquer relação com a disciplina de História"], correta: 1, explicacao: "O tempo histórico implica compreender mudança, continuidade, simultaneidade e sucessão — não apenas medir horas." },
        { enunciado: "A pré-história angolana é estudada, entre outras fontes, através de:", opcoes: ["Apenas relatos orais recentes", "Vestígios arqueológicos, como utensílios de pedra e gravuras rupestres", "Exclusivamente documentos escritos coloniais", "Jornais do século XX"], correta: 1, explicacao: "Sem escrita, a pré-história estuda-se através de vestígios materiais: utensílios, ossos, gravuras rupestres, entre outros." },
        { enunciado: "Os reinos africanos pré-coloniais na região que corresponde hoje a Angola incluíam, entre outros:", opcoes: ["Apenas impérios europeus", "O Reino do Kongo, o Reino do Ndongo e o Reino da Matamba", "Exclusivamente cidades-estado gregas", "Impérios asiáticos"], correta: 1, explicacao: "Antes da colonização, existiam reinos africanos organizados como o Kongo, o Ndongo e a Matamba, entre outros, no território correspondente à atual Angola." },
        { enunciado: "O tráfico transatlântico de escravos, que afetou fortemente a região, teve como um dos seus principais destinos:", opcoes: ["A Austrália", "As Américas (Brasil, Caribe e América do Norte)", "A Escandinávia", "O Japão"], correta: 1, explicacao: "O tráfico transatlântico levou milhões de africanos escravizados sobretudo para as Américas, incluindo o Brasil em grande escala." },
        { enunciado: "A Conferência de Berlim (1884-1885) teve como principal consequência para o continente africano:", opcoes: ["A independência imediata de todos os territórios", "A partilha formal de África entre as potências coloniais europeias", "O fim do colonialismo", "A criação da União Africana"], correta: 1, explicacao: "A Conferência de Berlim estabeleceu critérios para a partilha colonial de África entre as potências europeias." },
        { enunciado: "No ensino da História do 2.º ciclo, a comparação entre diferentes fontes sobre um mesmo acontecimento serve principalmente para:", opcoes: ["Confundir o aluno propositadamente", "Desenvolver o espírito crítico, mostrando que a História pode ter interpretações diferentes", "Provar que só existe uma versão correta e única", "Substituir a avaliação escrita"], correta: 1, explicacao: "Comparar fontes desenvolve o espírito crítico e mostra ao aluno que a narrativa histórica pode ser interpretada de formas distintas." },
        { enunciado: "A Idade Média europeia é geralmente situada, em termos cronológicos gerais, entre:", opcoes: ["O século I e o século V", "O século V e o século XV (queda do Império Romano do Ocidente até à Idade Moderna)", "O século XV e o século XX", "Apenas o século X"], correta: 1, explicacao: "A Idade Média situa-se tradicionalmente entre a queda do Império Romano do Ocidente (476 d.C.) e o início da Idade Moderna, por volta do século XV." },
        { enunciado: "O feudalismo, sistema socioeconómico característico da Idade Média europeia, baseava-se principalmente em:", opcoes: ["Relações de trabalho assalariado moderno", "Relações de vassalagem e posse da terra entre senhores e vassalos", "Democracia direta", "Comércio marítimo global"], correta: 1, explicacao: "O feudalismo assentava em relações de vassalagem, onde senhores feudais cediam terras (feudos) a vassalos em troca de serviços e lealdade." },
        { enunciado: "As Grandes Navegações, iniciadas por Portugal e Espanha a partir do século XV, tiveram como um dos seus principais objetivos:", opcoes: ["Explorar o espaço", "Encontrar novas rotas comerciais, sobretudo para as especiarias do Oriente", "Colonizar a Antártida", "Unificar a Europa politicamente"], correta: 1, explicacao: "As Grandes Navegações visaram, entre outros objetivos, encontrar novas rotas comerciais marítimas para o comércio de especiarias." },
        { enunciado: "A chegada de Diogo Cão à foz do rio Congo, em 1482, marca o início:", opcoes: ["Da independência de Angola", "Dos contactos entre Portugal e os reinos da região do Kongo", "Da Segunda Guerra Mundial em África", "Da Guerra Fria em Angola"], correta: 1, explicacao: "A chegada de Diogo Cão em 1482 inicia os contactos diplomáticos e comerciais entre Portugal e o Reino do Kongo." },
        { enunciado: "O Iluminismo, movimento intelectual do século XVIII, defendia principalmente:", opcoes: ["O regresso ao pensamento medieval", "O uso da razão como instrumento central para compreender o mundo e organizar a sociedade", "A submissão total à autoridade religiosa em todos os domínios", "A rejeição de qualquer forma de ciência"], correta: 1, explicacao: "O Iluminismo valorizou a razão, a ciência e a crítica às autoridades tradicionais, influenciando revoluções posteriores." },
        { enunciado: "A Revolução Francesa (1789) teve, entre as suas causas, o descontentamento popular relacionado com:", opcoes: ["Excesso de igualdade social prévia", "As desigualdades do Antigo Regime e a crise financeira do Estado francês", "A ausência total de impostos", "A abundância generalizada de alimentos"], correta: 1, explicacao: "As desigualdades sociais do Antigo Regime e a grave crise financeira do Estado foram causas centrais da Revolução Francesa." },
        { enunciado: "A Revolução Industrial, iniciada na Grã-Bretanha no século XVIII, provocou, entre outras mudanças:", opcoes: ["O regresso a uma economia exclusivamente agrícola", "A transição de uma produção artesanal para uma produção mecanizada em fábricas", "O fim do comércio internacional", "A eliminação das cidades"], correta: 1, explicacao: "A Revolução Industrial transformou a produção artesanal em produção mecanizada e fabril, alterando profundamente a sociedade." },
        { enunciado: "A Primeira Guerra Mundial (1914-1918) opôs, de forma geral, dois grandes blocos:", opcoes: ["A Tríplice Aliança e a Tríplice Entente", "A NATO e o Pacto de Varsóvia", "O Norte e o Sul dos Estados Unidos", "A União Soviética e a China"], correta: 0, explicacao: "A Primeira Guerra Mundial opôs sobretudo a Tríplice Aliança (Alemanha, Áustria-Hungria, Itália) à Tríplice Entente (França, Reino Unido, Rússia)." },
        { enunciado: "A Revolução Russa de 1917 conduziu à criação, pela primeira vez na história, de:", opcoes: ["Uma monarquia constitucional", "Um Estado socialista, sob liderança dos bolcheviques", "Uma república islâmica", "Uma confederação de repúblicas capitalistas"], correta: 1, explicacao: "A Revolução de Outubro de 1917 instaurou o primeiro Estado socialista da história, sob liderança bolchevique." },
        { enunciado: "A Segunda Guerra Mundial (1939-1945) teve início formal com a invasão de:", opcoes: ["A Polónia pela Alemanha nazi", "O Japão pelos Estados Unidos", "A França pela Itália", "A Rússia pela China"], correta: 0, explicacao: "A invasão da Polónia pela Alemanha nazi, em setembro de 1939, marcou o início formal da Segunda Guerra Mundial." },
        { enunciado: "A Guerra Fria (1947-1991) caracterizou-se essencialmente por uma rivalidade:", opcoes: ["Militar directa e declarada entre EUA e URSS", "Ideológica, política e económica entre EUA e URSS, sem confronto militar directo entre si", "Comercial entre a China e o Japão", "Religiosa entre o Vaticano e a Rússia"], correta: 1, explicacao: "A Guerra Fria caracterizou-se por tensão ideológica e política entre EUA e URSS, sem guerra directa entre as duas potências." },
        { enunciado: "O processo de descolonização africana ocorreu, na sua maioria, principalmente durante:", opcoes: ["O século XIX", "As décadas de 1950 a 1970 do século XX", "A Idade Média", "O início do século XXI"], correta: 1, explicacao: "A maior parte dos países africanos alcançou a independência entre as décadas de 1950 e 1970 do século XX." },
        { enunciado: "Ao ensinar a independência de Angola no 1.º/2.º ciclo, uma boa prática pedagógica é:", opcoes: ["Apresentar apenas datas soltas para decorar", "Relacionar a data com histórias, testemunhos e símbolos que a criança consiga associar de forma significativa", "Evitar totalmente o tema por ser complexo", "Ensinar exclusivamente através de textos jurídicos formais"], correta: 1, explicacao: "A aprendizagem significativa relaciona factos históricos a narrativas, símbolos e elementos que facilitam a compreensão e memorização pela criança." },
        { enunciado: "Os Acordos de Bicesse (1991) e o Protocolo de Lusaka (1994) relacionam-se, ambos, com:", opcoes: ["A independência de Angola", "Tentativas de paz durante a guerra civil angolana", "A criação da moeda nacional", "A adesão de Angola à ONU"], correta: 1, explicacao: "Ambos os acordos representaram tentativas negociais de pôr fim à guerra civil angolana, antes do fim definitivo em 2002." },
        { enunciado: "A linha do tempo (cronograma), enquanto recurso didático em História, ajuda o aluno principalmente a:", opcoes: ["Decorar apenas nomes de reis", "Visualizar a sequência e a duração dos acontecimentos ao longo do tempo", "Substituir a leitura de qualquer texto histórico", "Ser avaliado sem necessidade de outro instrumento"], correta: 1, explicacao: "A linha do tempo é um recurso visual que ajuda o aluno a perceber a sequência cronológica e a duração relativa dos acontecimentos." },
        { enunciado: "O uso de mapas históricos na aula de História contribui, entre outros aspetos, para:", opcoes: ["Confundir a localização espacial dos factos", "Relacionar os acontecimentos históricos com o espaço geográfico onde ocorreram", "Substituir totalmente os textos escritos", "Ser usado apenas em Geografia"], correta: 1, explicacao: "Mapas históricos ajudam o aluno a relacionar o 'onde' com o 'quando' dos acontecimentos, fortalecendo a compreensão espácio-temporal." },
        { enunciado: "A civilização do Antigo Egipto desenvolveu-se principalmente ao longo de que rio?", opcoes: ["Rio Congo", "Rio Nilo", "Rio Zambeze", "Rio Níger"], correta: 1, explicacao: "A civilização egípcia antiga desenvolveu-se ao longo do rio Nilo, cujas cheias fertilizavam as terras agrícolas." },
        { enunciado: "A democracia ateniense, na Grécia Antiga, caracterizava-se por permitir a participação política de:", opcoes: ["Todos os habitantes, sem qualquer exceção", "Apenas os cidadãos do sexo masculino, livres e adultos — excluindo mulheres, estrangeiros e escravos", "Exclusivamente mulheres", "Apenas estrangeiros residentes"], correta: 1, explicacao: "A democracia ateniense era limitada aos cidadãos homens, livres e adultos, excluindo mulheres, estrangeiros e escravos." },
        { enunciado: "O Império Romano expandiu-se, no seu apogeu, por três continentes, nomeadamente:", opcoes: ["Ásia, América e Oceania", "Europa, África (norte) e Ásia (parte ocidental)", "Apenas a Europa", "América do Sul e Antártida"], correta: 1, explicacao: "No seu apogeu, o Império Romano estendia-se pela Europa, norte de África e parte ocidental da Ásia." },
        { enunciado: "Na avaliação de aprendizagens em História, o uso exclusivo de perguntas de memorização de datas é considerado, do ponto de vista pedagógico:", opcoes: ["A melhor e única forma válida de avaliar", "Limitado, pois não avalia a compreensão, análise e interpretação histórica do aluno", "Obrigatório em todos os níveis de ensino", "Irrelevante para a disciplina de História"], correta: 1, explicacao: "Uma avaliação equilibrada em História deve ir além da memorização, avaliando também compreensão, análise crítica e interpretação de fontes." },
        { enunciado: "A abolição da escravatura, processo que se estendeu ao longo do século XIX em várias partes do mundo, foi impulsionada, entre outros fatores, por:", opcoes: ["O desejo de aumentar o tráfico de escravos", "Movimentos abolicionistas, mudanças económicas e pressões internacionais", "A ausência total de resistência dos escravizados", "A vontade exclusiva dos comerciantes de escravos"], correta: 1, explicacao: "A abolição resultou de uma combinação de movimentos abolicionistas, transformações económicas e pressão diplomática internacional." },
        { enunciado: "Ao trabalhar a História local (da comunidade, bairro ou província) com os alunos, o principal benefício pedagógico é:", opcoes: ["Ser irrelevante para a compreensão da História nacional", "Aproximar a aprendizagem da realidade vivida pelo aluno, tornando-a mais significativa", "Substituir totalmente a História nacional e universal", "Confundir o aluno com factos sem importância"], correta: 1, explicacao: "A História local aproxima o conteúdo da vivência do aluno, facilitando a compreensão de conceitos históricos mais amplos." },
        { enunciado: "A Carta das Nações Unidas, assinada em 1945, teve como um dos seus principais objetivos:", opcoes: ["Iniciar uma nova guerra mundial", "Promover a paz, a segurança internacional e a cooperação entre os Estados", "Recolonizar África", "Eliminar a Assembleia Geral"], correta: 1, explicacao: "A Carta das Nações Unidas estabeleceu os princípios fundadores da ONU: paz, segurança internacional e cooperação entre Estados." },
        { enunciado: "Um erro comum a evitar no ensino da História é:", opcoes: ["Apresentar apenas uma narrativa e insistir que é a única versão possível e definitiva dos factos", "Convidar os alunos a analisar diferentes fontes e perspetivas", "Relacionar o passado com o presente", "Usar recursos visuais como mapas e linhas do tempo"], correta: 0, explicacao: "Apresentar uma única narrativa como verdade absoluta e inquestionável contraria os princípios do pensamento histórico crítico." },
        { enunciado: "O Dia Mundial do Património, comemorado internacionalmente, visa sensibilizar para a importância de:", opcoes: ["Destruir monumentos antigos para dar lugar a novas construções", "Preservar bens culturais, históricos e naturais para as gerações futuras", "Ignorar a história de povos indígenas", "Substituir museus por centros comerciais"], correta: 1, explicacao: "O Dia Mundial do Património sensibiliza para a preservação de bens culturais, históricos e naturais, valorizando a memória colectiva." },
        { enunciado: "A utilização de jogos e dramatizações no ensino da História do 1.º ciclo tem como principal vantagem pedagógica:", opcoes: ["Tornar a aula menos séria e sem valor educativo", "Tornar a aprendizagem mais concreta, motivadora e adequada à fase de desenvolvimento da criança", "Substituir totalmente a necessidade de ensinar factos históricos", "Ser aplicável apenas ao ensino secundário"], correta: 1, explicacao: "Jogos e dramatizações tornam conceitos históricos abstratos mais concretos e motivadores, adequados ao desenvolvimento cognitivo de crianças do 1.º ciclo." }
      ]},
      { id: "doc-geografia", nome: "Docência — Geografia", questoes: [
        { enunciado: "Angola está localizada, em termos de grandes regiões, em:", opcoes: ["África Ocidental", "África Austral (Sul de África)", "África Oriental", "Norte de África"], correta: 1, explicacao: "Angola situa-se na região da África Austral, banhada a oeste pelo Oceano Atlântico." },
        { enunciado: "O principal rio que atravessa o norte de Angola, partilhado com a RD Congo, é:", opcoes: ["Rio Zambeze", "Rio Congo (Zaire)", "Rio Cunene", "Rio Kwanza"], correta: 1, explicacao: "O Rio Congo (também chamado Zaire) delimita parte da fronteira norte de Angola com a RD Congo." },
        { enunciado: "O clima predominante na maior parte de Angola classifica-se como:", opcoes: ["Polar", "Tropical, com estação seca (cacimbo) e estação chuvosa", "Mediterrânico", "Desértico em todo o território"], correta: 1, explicacao: "Angola tem clima maioritariamente tropical, com alternância entre estação seca (cacimbo) e chuvosa." },
        { enunciado: "Na didática da Geografia, o uso de mapas em sala de aula desenvolve principalmente a competência de:", opcoes: ["Memorização de poemas", "Leitura e interpretação espacial do território", "Cálculo algébrico", "Análise gramatical de textos"], correta: 1, explicacao: "Os mapas são ferramentas centrais para desenvolver a literacia espacial e a leitura do território." }
      ]},
      { id: "doc-biologia", nome: "Docência — Biologia", questoes: [
        { enunciado: "A fotossíntese é o processo pelo qual as plantas:", opcoes: ["Absorvem água apenas pelas folhas", "Produzem matéria orgânica e oxigénio a partir de luz, água e dióxido de carbono", "Realizam respiração celular exclusivamente", "Absorvem nutrientes minerais do ar"], correta: 1, explicacao: "A fotossíntese converte luz solar, água e CO₂ em glicose e oxigénio, nos cloroplastos das plantas." },
        { enunciado: "A célula considerada a unidade básica da vida foi descrita, em termos gerais, pela:", opcoes: ["Teoria da evolução", "Teoria celular", "Teoria do Big Bang", "Lei de Mendel"], correta: 1, explicacao: "A teoria celular estabelece a célula como unidade estrutural e funcional básica dos seres vivos." },
        { enunciado: "O DNA (ADN) tem como principal função biológica:", opcoes: ["Fornecer energia direta à célula", "Armazenar e transmitir a informação genética", "Realizar a fotossíntese", "Formar exclusivamente a parede celular"], correta: 1, explicacao: "O ADN é a molécula responsável por armazenar e transmitir a informação genética dos seres vivos." },
        { enunciado: "Na didática da Biologia, o trabalho laboratorial contribui essencialmente para:", opcoes: ["Substituir toda a teoria", "Aproximar o aluno do método científico e da observação directa dos fenómenos", "Ser apenas uma atividade lúdica sem valor pedagógico", "Reduzir o interesse pela disciplina"], correta: 1, explicacao: "O trabalho laboratorial desenvolve competências de observação, experimentação e raciocínio científico." }
      ]},
      { id: "doc-filosofia", nome: "Docência — Filosofia", questoes: [
        { enunciado: "Sócrates é conhecido, na história da Filosofia, pelo método:", opcoes: ["Da dúvida metódica cartesiana", "Maiêutico, baseado no diálogo e em perguntas sucessivas", "Do materialismo dialético", "Do empirismo radical"], correta: 1, explicacao: "O método socrático (maiêutica) usa perguntas sucessivas para conduzir o interlocutor à reflexão e ao autoconhecimento." },
        { enunciado: "Para o racionalismo, defendido por autores como Descartes, o conhecimento tem origem fundamentalmente:", opcoes: ["Na experiência sensorial", "Na razão", "Na tradição religiosa exclusivamente", "No acaso"], correta: 1, explicacao: "O racionalismo defende que a razão é a principal fonte segura de conhecimento verdadeiro." },
        { enunciado: "A ética, enquanto ramo da Filosofia, ocupa-se principalmente do estudo:", opcoes: ["Das leis físicas do universo", "Dos princípios que orientam a moral e a conduta humana", "Das regras gramaticais", "Da composição química da matéria"], correta: 1, explicacao: "A ética estuda os fundamentos da moral, dos valores e da conduta humana correta." },
        { enunciado: "No ensino da Filosofia, o objetivo central da disciplina é, sobretudo:", opcoes: ["Fazer os alunos decorar biografias de filósofos", "Desenvolver o pensamento crítico, o questionamento e a argumentação", "Substituir a Educação Física", "Ensinar cálculo numérico avançado"], correta: 1, explicacao: "A Filosofia visa desenvolver o pensamento crítico, reflexivo e a capacidade argumentativa dos alunos." }
      ]},
      { id: "doc-ed-fisica", nome: "Docência — Educação Física", questoes: [
        { enunciado: "Na Educação Física escolar, o desenvolvimento da 'coordenação motora' refere-se essencialmente a:", opcoes: ["A força muscular máxima isolada", "A capacidade de organizar e executar movimentos de forma eficiente e harmoniosa", "Apenas velocidade de corrida", "Resistência cardiovascular exclusivamente"], correta: 1, explicacao: "Coordenação motora é a capacidade de organizar e executar movimentos de forma harmoniosa e eficaz." },
        { enunciado: "O aquecimento antes da actividade física principal tem como objetivo primário:", opcoes: ["Cansar o aluno antes da aula", "Preparar o corpo para o esforço, prevenindo lesões", "Substituir o treino principal", "Avaliar o desempenho final"], correta: 1, explicacao: "O aquecimento prepara fisiologicamente o corpo para o esforço, reduzindo o risco de lesões." },
        { enunciado: "Na didática da Educação Física, a inclusão de alunos com diferentes níveis de habilidade motora deve, preferencialmente:", opcoes: ["Excluir os menos habilidosos das atividades", "Adaptar tarefas e regras para permitir a participação de todos", "Ser feita apenas em competições oficiais", "Ignorar as diferenças individuais"], correta: 1, explicacao: "Uma didática inclusiva adapta tarefas para garantir participação efetiva de todos os alunos." },
        { enunciado: "O desenvolvimento da resistência cardiorrespiratória está mais associado a atividades como:", opcoes: ["Levantamento de peso máximo isolado", "Corrida contínua, natação ou ciclismo prolongado", "Alongamento estático apenas", "Jogos de tabuleiro"], correta: 1, explicacao: "Atividades aeróbicas contínuas e prolongadas desenvolvem a resistência cardiorrespiratória." }
      ]}
    ]
  }
];

const NOME_PLATAFORMA = "Preparatório Unificado";

// ─────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD_KEY = "simulados-admin-password";
const ACCESS_CODES_KEY = "simulados-access-codes";
const DEFAULT_ADMIN_PASSWORD = "admin2026";

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [tela, setTela] = useState("acesso");
  const [exameEscolhido, setExameEscolhido] = useState(null);
  const [disciplinaEscolhida, setDisciplinaEscolhida] = useState(null);
  const [exameAtivo, setExameAtivo] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [ehAdmin, setEhAdmin] = useState(false);
  const [codigosAcesso, setCodigosAcesso] = useState([]);
  const [acessoPermitido, setAcessoPermitido] = useState("todos");
  const [erro, setErro] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("access_codes").select("*").order("criado_em");
      if (!error && data) {
        setCodigosAcesso(data.map((c) => ({
          codigo: c.codigo,
          titular: c.titular,
          criadoEm: new Date(c.criado_em).toLocaleDateString("pt-PT"),
          plano: c.plano || "sem prazo",
          expiraEm: c.expira_em,
          acesso: c.acesso || "todos",
        })));
      }
      setCarregando(false);
    })();
  }, []);

  const salvarCodigos = async (novaLista) => {
    setCodigosAcesso(novaLista);
    // Nota: esta função é usada apenas para atualizar o estado local depois
    // de operações feitas diretamente no Supabase (ver adicionarCodigo e
    // removerCodigo dentro de TelaAdmin).
  };

  const entrarComCodigo = (codigoDigitado) => {
    const codigo = codigoDigitado.trim().toUpperCase();
    if (!codigo) return;
    const valido = codigosAcesso.find((c) => c.codigo === codigo);
    if (!valido) { setErro("Código de acesso inválido. Confirme com o administrador."); return; }
    if (valido.expiraEm && new Date(valido.expiraEm) < new Date()) {
      setErro("Este código expirou. Contacte o administrador para renovar o acesso.");
      return;
    }
    setAcessoPermitido(valido.acesso || "todos");
    setErro("");
    setTela("inicio");
  };

  const entrarComoAdmin = async (senha) => {
    let senhaAtual = DEFAULT_ADMIN_PASSWORD;
    const { data } = await supabase.from("admin_settings").select("senha").eq("id", 1).single();
    if (data) senhaAtual = data.senha;
    if (senha === senhaAtual) { setAcessoPermitido("todos"); setErro(""); setEhAdmin(true); setTela("admin"); }
    else setErro("Senha de administrador incorreta.");
  };

  const escolherExame = (exame) => {
    setExameEscolhido(exame);
    if (exame.disciplinas.length === 1) {
      setDisciplinaEscolhida(exame.disciplinas[0]);
      setTela("configurar");
    } else {
      setTela("disciplinas");
    }
  };

  const escolherDisciplina = (disciplina) => {
    setDisciplinaEscolhida(disciplina);
    setTela("configurar");
  };

  const embaralhar = (lista) => {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  };

  const iniciarProva = async (quantidade, segundosPorQuestao) => {
    const chave = `usadas-${exameEscolhido.id}-${disciplinaEscolhida.id}`;
    const banco = disciplinaEscolhida.questoes;
    const idQuestao = (q) => q.enunciado.slice(0, 60);
    // Esta parte usa localStorage do navegador (não o Supabase): serve apenas
    // para o site "lembrar", neste aparelho, quais questões este candidato já
    // fez, para não repetir. Não precisa de conta nem de ligação à internet
    // para funcionar — é só a memória do próprio telemóvel/computador.
    let usadas = [];
    try {
      usadas = JSON.parse(localStorage.getItem(chave) || "[]");
    } catch { usadas = []; }
    let disponiveis = banco.filter((q) => !usadas.includes(idQuestao(q)));
    if (disponiveis.length < quantidade) { disponiveis = banco; usadas = []; }
    const escolhidas = quantidade >= disponiveis.length ? embaralhar(disponiveis) : embaralhar(disponiveis).slice(0, quantidade);
    const novasUsadas = [...usadas, ...escolhidas.map(idQuestao)];
    try { localStorage.setItem(chave, JSON.stringify(novasUsadas)); } catch {}
    setExameAtivo({ ...exameEscolhido, nomeDisciplina: disciplinaEscolhida.nome, questoes: escolhidas, tempoPorQuestaoSeg: segundosPorQuestao });
    setRespostas({});
    setIndiceAtual(0);
    setTela("prova");
  };

  const responder = (i) => setRespostas((prev) => ({ ...prev, [indiceAtual]: i }));
  const avancar = () => { if (indiceAtual < exameAtivo.questoes.length - 1) setIndiceAtual((i) => i + 1); else setTela("resultado"); };
  const recuar = () => { if (indiceAtual > 0) setIndiceAtual((i) => i - 1); };

  const resultado = useMemo(() => {
    if (!exameAtivo) return null;
    let acertos = 0;
    exameAtivo.questoes.forEach((q, i) => { if (respostas[i] === q.correta) acertos += 1; });
    return { acertos, total: exameAtivo.questoes.length };
  }, [exameAtivo, respostas]);

  return (
    <div style={{ minHeight: "100vh", background: "#F0E6D2", fontFamily: "'Source Serif 4', Georgia, serif", color: "#2A2620" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .sans { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        button, input { font-family: inherit; }
        button { cursor: pointer; }
        button:focus-visible, input:focus-visible { outline: 3px solid #1B2A4A; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {carregando && <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p className="sans" style={{ color: "#5C4A2E" }}>A carregar…</p></div>}

      {!carregando && tela === "acesso" && (
        <TelaAcesso onEntrar={entrarComCodigo} onEntrarAdmin={entrarComoAdmin} erro={erro} limparErro={() => setErro("")} />
      )}
      {!carregando && tela === "inicio" && (
        <TelaInicio onEscolher={escolherExame} ehAdmin={ehAdmin} acessoPermitido={acessoPermitido} onIrParaAdmin={() => setTela("admin")} onSair={() => { setEhAdmin(false); setAcessoPermitido("todos"); setTela("acesso"); }} />
      )}
      {!carregando && tela === "disciplinas" && exameEscolhido && (
        <TelaDisciplinas exame={exameEscolhido} onEscolher={escolherDisciplina} onVoltar={() => setTela("inicio")} />
      )}
      {!carregando && tela === "configurar" && exameEscolhido && disciplinaEscolhida && (
        <TelaConfigurar exame={exameEscolhido} disciplina={disciplinaEscolhida} onIniciar={iniciarProva} onVoltar={() => setTela(exameEscolhido.disciplinas.length === 1 ? "inicio" : "disciplinas")} />
      )}
      {!carregando && tela === "prova" && exameAtivo && (
        <TelaProva exame={exameAtivo} indice={indiceAtual} resposta={respostas[indiceAtual]} onResponder={responder} onAvancar={avancar} onRecuar={recuar} />
      )}
      {!carregando && tela === "resultado" && exameAtivo && resultado && (
        <TelaResultado exame={exameAtivo} respostas={respostas} resultado={resultado} onRefazer={() => setTela("configurar")} onVoltar={() => setTela("inicio")} />
      )}
      {!carregando && tela === "admin" && ehAdmin && (
        <TelaAdmin codigos={codigosAcesso} onSalvarCodigos={salvarCodigos} onVoltar={() => setTela("inicio")} adminPasswordKey={ADMIN_PASSWORD_KEY} senhaPadrao={DEFAULT_ADMIN_PASSWORD} />
      )}
    </div>
  );
}

// ── TELA DE ACESSO ──────────────────────────────────────────────────────

function TelaAcesso({ onEntrar, onEntrarAdmin, erro, limparErro }) {
  const [codigo, setCodigo] = useState("");
  const [modoAdmin, setModoAdmin] = useState(false);
  const [senhaAdmin, setSenhaAdmin] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 400, width: "100%", background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 6, padding: "36px 32px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Lock size={20} color="#F0E6D2" />
          </div>
        </div>
        <h1 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{NOME_PLATAFORMA}</h1>
        <p className="sans" style={{ textAlign: "center", fontSize: 13.5, color: "#5C4A2E", margin: "0 0 24px" }}>
          {modoAdmin ? "Acesso do administrador" : "Introduza o código de acesso fornecido pelo administrador"}
        </p>
        {!modoAdmin ? (
          <>
            <input value={codigo} onChange={(e) => { setCodigo(e.target.value); limparErro(); }} onKeyDown={(e) => e.key === "Enter" && onEntrar(codigo)} placeholder="Ex: HUAMBO2026" className="sans mono" style={{ width: "100%", padding: "12px 14px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 15, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }} />
            <button onClick={() => onEntrar(codigo)} className="sans" style={{ width: "100%", padding: "12px", borderRadius: 4, border: "none", background: "#1B2A4A", color: "#FBF7EE", fontWeight: 700, fontSize: 15 }}>Entrar</button>
          </>
        ) : (
          <>
            <input type="password" value={senhaAdmin} onChange={(e) => { setSenhaAdmin(e.target.value); limparErro(); }} onKeyDown={(e) => e.key === "Enter" && onEntrarAdmin(senhaAdmin)} placeholder="Senha de administrador" className="sans" style={{ width: "100%", padding: "12px 14px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 15, marginBottom: 12 }} />
            <button onClick={() => onEntrarAdmin(senhaAdmin)} className="sans" style={{ width: "100%", padding: "12px", borderRadius: 4, border: "none", background: "#A23E2E", color: "#FBF7EE", fontWeight: 700, fontSize: 15 }}>Entrar como administrador</button>
          </>
        )}
        {erro && <p className="sans" style={{ color: "#A23E2E", fontSize: 13, marginTop: 12, textAlign: "center" }}>{erro}</p>}
        <button onClick={() => { setModoAdmin((v) => !v); limparErro(); }} className="sans" style={{ width: "100%", background: "transparent", border: "none", color: "#5C4A2E", fontSize: 12.5, marginTop: 20, textDecoration: "underline" }}>
          {modoAdmin ? "← Voltar para entrada com código" : "Sou administrador"}
        </button>
      </div>
    </div>
  );
}

// ── TELA INICIAL ────────────────────────────────────────────────────────

function TelaInicio({ onEscolher, ehAdmin, acessoPermitido, onIrParaAdmin, onSair }) {
  const examsVisiveis = acessoPermitido === "todos" ? EXAMS : EXAMS.filter((e) => e.id === acessoPermitido);
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginBottom: 8 }}>
        {ehAdmin && <button onClick={onIrParaAdmin} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#1B2A4A", fontSize: 13, fontWeight: 700 }}><ShieldCheck size={15} /> Painel do administrador</button>}
        <button onClick={onSair} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#8A7B5C", fontSize: 13 }}><LogOut size={15} /> Sair</button>
      </div>
      <header style={{ borderBottom: "3px double #2A2620", paddingBottom: 24, marginBottom: 40 }}>
        <div className="mono sans" style={{ fontSize: 12, letterSpacing: "0.12em", color: "#5C4A2E", textTransform: "uppercase", marginBottom: 10 }}>Plataforma de Preparação — República de Angola</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: 0, fontWeight: 700, lineHeight: 1.1 }}>{NOME_PLATAFORMA}</h1>
        <p className="sans" style={{ color: "#5C4A2E", fontSize: 16, marginTop: 12, maxWidth: 560 }}>
          {acessoPermitido === "todos" ? "Escolha um caderno de prova abaixo." : "O seu código dá acesso ao caderno abaixo."} Cada simulado é corrigido automaticamente, com gabarito comentado ao final.
        </p>
      </header>
      <div style={{ display: "grid", gap: 16 }}>
        {examsVisiveis.map((exame) => {
          const totalQ = exame.disciplinas.reduce((s, d) => s + d.questoes.length, 0);
          return (
            <button key={exame.id} onClick={() => onEscolher(exame)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", background: "#FBF7EE", border: "1px solid #D8CBA8", borderLeft: `6px solid ${exame.accent}`, borderRadius: 4, padding: "20px 24px" }}>
              <div>
                <div className="mono sans" style={{ fontSize: 11, letterSpacing: "0.08em", color: exame.accent, fontWeight: 700, marginBottom: 6 }}>CADERNO {exame.codigo}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{exame.titulo}</div>
                <div className="sans" style={{ fontSize: 14, color: "#5C4A2E", marginTop: 2 }}>{exame.subtitulo}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <span className="sans mono" style={{ fontSize: 13, color: "#5C4A2E" }}>{exame.disciplinas.length > 1 ? `${exame.disciplinas.length} disciplinas` : `${totalQ} questões`}</span>
                <ChevronRight size={20} color={exame.accent} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── TELA DE DISCIPLINAS ─────────────────────────────────────────────────

function TelaDisciplinas({ exame, onEscolher, onVoltar }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 100px" }}>
      <button onClick={onVoltar} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#5C4A2E", fontSize: 13, marginBottom: 20 }}><ChevronLeft size={15} /> Voltar aos cadernos</button>
      <div className="mono sans" style={{ fontSize: 12, letterSpacing: "0.08em", color: exame.accent, fontWeight: 700, marginBottom: 8 }}>CADERNO {exame.codigo}</div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>{exame.titulo}</h1>
      <p className="sans" style={{ color: "#5C4A2E", fontSize: 14, marginBottom: 28 }}>Escolha a disciplina que quer praticar.</p>
      <div style={{ display: "grid", gap: 10 }}>
        {exame.disciplinas.map((d) => (
          <button key={d.id} onClick={() => onEscolher(d)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", background: "#FBF7EE", border: "1px solid #D8CBA8", borderLeft: `5px solid ${exame.accent}`, borderRadius: 4, padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BookOpen size={16} color={exame.accent} />
              <span className="sans" style={{ fontSize: 15, fontWeight: 600 }}>{d.nome}</span>
            </div>
            <span className="sans mono" style={{ fontSize: 12.5, color: "#5C4A2E" }}>{d.questoes.length} questões</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── TELA DE CONFIGURAÇÃO ────────────────────────────────────────────────

function TelaConfigurar({ exame, disciplina, onIniciar, onVoltar }) {
  const total = disciplina.questoes.length;
  const opcoesQuantidade = [5, 10, 20, total].filter((v, i, arr) => v > 0 && v <= total && arr.indexOf(v) === i);
  const opcoesTempo = [
    { label: "30 segundos", seg: 30 },
    { label: "2 minutos", seg: 120 },
    { label: "5 minutos", seg: 300 },
    { label: "15 minutos", seg: 900 },
    { label: "30 minutos", seg: 1800 },
    { label: "1 hora", seg: 3600 },
    { label: "3 horas", seg: 10800 },
    { label: "6 horas", seg: 21600 },
    { label: "Sem limite", seg: 0 },
  ];
  const [tempoSelecionado, setTempoSelecionado] = useState(0);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px 100px" }}>
      <button onClick={onVoltar} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#5C4A2E", fontSize: 13, marginBottom: 24 }}><ChevronLeft size={15} /> Voltar</button>
      <div className="mono sans" style={{ fontSize: 12, letterSpacing: "0.08em", color: exame.accent, fontWeight: 700, marginBottom: 8 }}>CADERNO {exame.codigo}</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{exame.titulo}</h1>
      <p className="sans" style={{ color: exame.accent, fontWeight: 700, fontSize: 15, margin: "0 0 20px" }}>{disciplina.nome}</p>

      <p className="sans" style={{ color: "#5C4A2E", fontSize: 14, marginBottom: 12 }}>1. Quantas questões quer responder? (banco tem {total})</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 10, marginBottom: 28 }}>
        {opcoesQuantidade.map((q) => (
          <button key={q} onClick={() => onIniciar(q, tempoSelecionado)} className="sans" style={{ padding: "18px 10px", borderRadius: 6, border: `1.5px solid ${exame.accent}`, background: "#FBF7EE", color: "#2A2620", fontWeight: 700, fontSize: 14 }}>
            {q === total ? `Todas (${total})` : `${q} questões`}
          </button>
        ))}
      </div>

      <p className="sans" style={{ color: "#5C4A2E", fontSize: 14, marginBottom: 12 }}>2. Tempo por cada questão (se esgotar, avança automaticamente para a próxima)</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8 }}>
        {opcoesTempo.map((t) => (
          <button
            key={t.seg}
            onClick={() => setTempoSelecionado(t.seg)}
            className="sans"
            style={{ padding: "10px 8px", borderRadius: 5, border: tempoSelecionado === t.seg ? `2px solid ${exame.accent}` : "1px solid #D8CBA8", background: tempoSelecionado === t.seg ? `${exame.accent}18` : "#FBF7EE", color: "#2A2620", fontWeight: tempoSelecionado === t.seg ? 700 : 500, fontSize: 12.5 }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="sans" style={{ fontSize: 12, color: "#8A7B5C", marginTop: 10 }}>Escolhido: {opcoesTempo.find((t) => t.seg === tempoSelecionado)?.label}. Depois clique numa opção de quantidade acima para começar.</p>
    </div>
  );
}

// ── TELA DA PROVA ───────────────────────────────────────────────────────

function TelaProva({ exame, indice, resposta, onResponder, onAvancar, onRecuar, onTempoEsgotado }) {
  const questao = exame.questoes[indice];
  const total = exame.questoes.length;
  const respondida = resposta !== undefined;
  const [restante, setRestante] = useState(exame.tempoPorQuestaoSeg || 0);

  useEffect(() => {
    setRestante(exame.tempoPorQuestaoSeg || 0);
  }, [indice, exame.tempoPorQuestaoSeg]);

  useEffect(() => {
    if (!exame.tempoPorQuestaoSeg) return;
    if (restante <= 0) { onAvancar(); return; }
    const id = setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [restante, exame.tempoPorQuestaoSeg]);

  const formatarTempo = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sg = s % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sg).padStart(2, "0")}` : `${m}:${String(sg).padStart(2, "0")}`;
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div className="mono sans" style={{ fontSize: 12, letterSpacing: "0.08em", color: exame.accent, fontWeight: 700 }}>
          {exame.codigo}{exame.nomeDisciplina ? ` · ${exame.nomeDisciplina}` : ""} · QUESTÃO {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        {exame.tempoPorQuestaoSeg > 0 && (
          <div className="mono sans" style={{ fontSize: 13, fontWeight: 700, color: restante <= 10 ? "#A23E2E" : "#2A2620", background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 4, padding: "3px 10px" }}>
            ⏱ {formatarTempo(restante)}
          </div>
        )}
      </div>
      <div style={{ height: 4, background: "#D8CBA8", borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((indice + 1) / total) * 100}%`, background: exame.accent, transition: "width 0.3s ease" }} />
      </div>
      <h2 style={{ fontSize: 22, lineHeight: 1.5, fontWeight: 600, marginBottom: 28 }}>{questao.enunciado}</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {questao.opcoes.map((opcao, i) => {
          const selecionada = resposta === i;
          return (
            <button key={i} onClick={() => onResponder(i)} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "16px 18px", borderRadius: 4, border: selecionada ? `2px solid ${exame.accent}` : "1px solid #D8CBA8", background: selecionada ? `${exame.accent}14` : "#FBF7EE" }}>
              <span className="mono" style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: selecionada ? exame.accent : "transparent", color: selecionada ? "#FBF7EE" : "#5C4A2E", border: selecionada ? "none" : "1px solid #B8A878" }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="sans" style={{ fontSize: 15 }}>{opcao}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
        <button onClick={onRecuar} disabled={indice === 0} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 4, border: "1px solid #D8CBA8", background: "transparent", color: indice === 0 ? "#C4B896" : "#2A2620", fontSize: 14, fontWeight: 600 }}><ChevronLeft size={16} /> Anterior</button>
        <button onClick={onAvancar} disabled={!respondida} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 22px", borderRadius: 4, border: "none", background: respondida ? exame.accent : "#D8CBA8", color: "#FBF7EE", fontSize: 14, fontWeight: 700 }}>{indice === total - 1 ? "Concluir prova" : "Próxima"} <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

// ── TELA DE RESULTADO ───────────────────────────────────────────────────

function TelaResultado({ exame, respostas, resultado, onRefazer, onVoltar }) {
  const percentual = Math.round((resultado.acertos / resultado.total) * 100);
  const nota = ((resultado.acertos / resultado.total) * 20).toFixed(1);

  const gerarPDF = () => {
    const janela = window.open("", "_blank");
    const linhas = exame.questoes.map((q, i) => {
      const respostaUser = respostas[i];
      const acertou = respostaUser === q.correta;
      return `
        <div style="margin-bottom:16px; padding:12px 0; border-bottom:1px solid #ddd;">
          <p style="font-weight:700; margin:0 0 6px;">${i + 1}. ${q.enunciado}</p>
          <p style="margin:0 0 3px; color:#3A5A40;">Resposta correta: ${String.fromCharCode(65 + q.correta)}) ${q.opcoes[q.correta]}</p>
          ${!acertou && respostaUser !== undefined ? `<p style="margin:0 0 3px; color:#A23E2E;">Sua resposta: ${String.fromCharCode(65 + respostaUser)}) ${q.opcoes[respostaUser]}</p>` : ""}
          <p style="margin:4px 0 0; color:#555; font-size:13px;">${q.explicacao}</p>
        </div>`;
    }).join("");
    janela.document.write(`
      <html><head><title>${exame.codigo} - Resultado</title>
      <style>body{font-family: Georgia, serif; padding:32px; color:#2A2620; max-width:700px; margin:0 auto;}
      h1{font-size:20px;} .resumo{border:2px solid #2A2620; padding:16px; margin-bottom:24px; text-align:center;}</style>
      </head><body>
      <h1>${exame.titulo}${exame.nomeDisciplina ? " — " + exame.nomeDisciplina : ""}</h1>
      <div class="resumo">
        <div style="font-size:28px; font-weight:700;">${resultado.acertos}/${resultado.total}</div>
        <div>${percentual}% de aproveitamento — Nota: ${nota} / 20 valores</div>
      </div>
      ${linhas}
      </body></html>
    `);
    janela.document.close();
    janela.focus();
    setTimeout(() => janela.print(), 300);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 100px" }}>
      <div className="sans" style={{ background: "#FBF7EE", border: `2px solid ${exame.accent}`, borderRadius: 6, padding: "32px 28px", textAlign: "center", marginBottom: 40 }}>
        <FileCheck size={32} color={exame.accent} style={{ marginBottom: 10 }} />
        <div className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: exame.accent, fontWeight: 700, marginBottom: 6 }}>RESULTADO · {exame.codigo}{exame.nomeDisciplina ? ` · ${exame.nomeDisciplina}` : ""}</div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{resultado.acertos}/{resultado.total}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 10, flexWrap: "wrap" }}>
          <div className="sans" style={{ fontSize: 15, color: "#5C4A2E" }}>{percentual}% de aproveitamento</div>
          <div className="mono sans" style={{ fontSize: 15, color: exame.accent, fontWeight: 700 }}>Nota: {nota} / 20 valores</div>
        </div>
        <button onClick={gerarPDF} className="sans" style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 4, border: `1px solid ${exame.accent}`, background: "transparent", color: exame.accent, fontWeight: 700, fontSize: 13 }}>
          <FileCheck size={15} /> Gerar PDF para rever no telemóvel
        </button>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Gabarito comentado</h3>
      <div style={{ display: "grid", gap: 14 }}>
        {exame.questoes.map((q, i) => {
          const respostaUser = respostas[i];
          const acertou = respostaUser === q.correta;
          return (
            <div key={i} style={{ background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                {acertou ? <CheckCircle2 size={18} color="#3A5A40" style={{ flexShrink: 0, marginTop: 2 }} /> : <XCircle size={18} color="#A23E2E" style={{ flexShrink: 0, marginTop: 2 }} />}
                <p className="sans" style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{i + 1}. {q.enunciado}</p>
              </div>
              <p className="sans" style={{ fontSize: 14, margin: "0 0 4px 28px", color: "#3A5A40" }}>Resposta correta: {String.fromCharCode(65 + q.correta)}) {q.opcoes[q.correta]}</p>
              {!acertou && respostaUser !== undefined && <p className="sans" style={{ fontSize: 14, margin: "0 0 8px 28px", color: "#A23E2E" }}>Sua resposta: {String.fromCharCode(65 + respostaUser)}) {q.opcoes[respostaUser]}</p>}
              <p className="sans" style={{ fontSize: 13.5, margin: "8px 0 0 28px", color: "#5C4A2E", lineHeight: 1.5 }}>{q.explicacao}</p>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center" }}>
        <button onClick={onRefazer} className="sans" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 4, border: `1px solid ${exame.accent}`, background: "transparent", color: exame.accent, fontWeight: 700, fontSize: 14 }}><RotateCcw size={16} /> Refazer</button>
        <button onClick={onVoltar} className="sans" style={{ padding: "12px 22px", borderRadius: 4, border: "none", background: "#2A2620", color: "#FBF7EE", fontWeight: 700, fontSize: 14 }}>Voltar aos cadernos</button>
      </div>
    </div>
  );
}

// ── PAINEL DO ADMINISTRADOR ─────────────────────────────────────────────

function TelaAdmin({ codigos, onSalvarCodigos, onVoltar, adminPasswordKey, senhaPadrao }) {
  const [novoCodigo, setNovoCodigo] = useState("");
  const [novoTitular, setNovoTitular] = useState("");
  const [novoPlano, setNovoPlano] = useState("mensal");
  const [novasHoras, setNovasHoras] = useState("2");
  const [novoAcesso, setNovoAcesso] = useState(EXAMS[0]?.id || "todos");
  const [novaSenhaAdmin, setNovaSenhaAdmin] = useState("");
  const [msg, setMsg] = useState("");

  const PLANOS = [
    { id: "personalizado", nome: "Personalizado (horas)", dias: null },
    { id: "diario", nome: "Diário (24h)", dias: 1 },
    { id: "semanal", nome: "Semanal", dias: 7 },
    { id: "mensal", nome: "Mensal", dias: 30 },
    { id: "anual", nome: "Anual", dias: 365 },
    { id: "sem-prazo", nome: "Sem prazo", dias: null },
  ];

  const gerarCodigoAleatorio = () => {
    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 6; i++) c += letras[Math.floor(Math.random() * letras.length)];
    return c;
  };

  const adicionarCodigo = async () => {
    const codigo = (novoCodigo.trim() || gerarCodigoAleatorio()).toUpperCase();
    if (codigos.some((c) => c.codigo === codigo)) { setMsg("Esse código já existe."); return; }
    const plano = PLANOS.find((p) => p.id === novoPlano);
    let expiraEm = null;
    let nomePlanoFinal = plano.nome;
    if (plano.id === "personalizado") {
      const horas = parseFloat(novasHoras) || 0;
      if (horas <= 0) { setMsg("Indique quantas horas de validade (ex: 2)."); return; }
      expiraEm = new Date(Date.now() + horas * 60 * 60 * 1000).toISOString();
      nomePlanoFinal = `${horas}h personalizado`;
    } else if (plano.dias) {
      expiraEm = new Date(Date.now() + plano.dias * 24 * 60 * 60 * 1000).toISOString();
    }
    const { error } = await supabase.from("access_codes").insert({
      codigo, titular: novoTitular.trim() || "—", plano: plano.id === "personalizado" ? `${novasHoras}h` : plano.id, expira_em: expiraEm, acesso: novoAcesso,
    });
    if (error) { setMsg("Não foi possível criar o código."); return; }
    onSalvarCodigos([...codigos, {
      codigo, titular: novoTitular.trim() || "—", criadoEm: new Date().toLocaleDateString("pt-PT"),
      plano: plano.id === "personalizado" ? `${novasHoras}h` : plano.id, expiraEm, acesso: novoAcesso,
    }]);
    setNovoCodigo(""); setNovoTitular("");
    const nomeExame = EXAMS.find((e) => e.id === novoAcesso)?.titulo || "Todos os cadernos";
    setMsg(`Código "${codigo}" criado (${nomePlanoFinal} · ${nomeExame}).`);
  };

  const removerCodigo = async (codigo) => {
    await supabase.from("access_codes").delete().eq("codigo", codigo);
    onSalvarCodigos(codigos.filter((c) => c.codigo !== codigo));
  };

  const alterarSenhaAdmin = async () => {
    if (!novaSenhaAdmin.trim()) return;
    const { error } = await supabase.from("admin_settings").update({ senha: novaSenhaAdmin.trim() }).eq("id", 1);
    if (!error) {
      setMsg("Senha de administrador atualizada.");
      setNovaSenhaAdmin("");
    } else { setMsg("Não foi possível atualizar a senha."); }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 100px" }}>
      <button onClick={onVoltar} className="sans" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#5C4A2E", fontSize: 13, marginBottom: 20 }}><ChevronLeft size={15} /> Voltar aos cadernos</button>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", display: "flex", alignItems: "center", gap: 10 }}><ShieldCheck size={24} color="#1B2A4A" /> Painel do administrador</h1>
      <p className="sans" style={{ color: "#5C4A2E", fontSize: 14, marginBottom: 32 }}>Estes dados são partilhados: qualquer pessoa com o link do site vê a lista, mas só quem tiver um código consegue entrar nos cadernos.</p>
      <div style={{ background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 6, padding: 24, marginBottom: 24 }}>
        <h2 className="sans" style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px" }}>Criar novo código de acesso</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <input value={novoCodigo} onChange={(e) => setNovoCodigo(e.target.value)} placeholder="Código (opcional — gera automático)" className="sans mono" style={{ flex: 1, minWidth: 180, padding: "10px 12px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 14 }} />
          <input value={novoTitular} onChange={(e) => setNovoTitular(e.target.value)} placeholder="Nome do titular (opcional)" className="sans" style={{ flex: 1, minWidth: 180, padding: "10px 12px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 14 }} />
        </div>
        <p className="sans" style={{ fontSize: 13, color: "#5C4A2E", margin: "0 0 8px" }}>Este código dá acesso a:</p>
        <select
          value={novoAcesso}
          onChange={(e) => setNovoAcesso(e.target.value)}
          className="sans"
          style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 14, marginBottom: 14, background: "#FBF7EE" }}
        >
          <option value="todos">Todos os cadernos (uso pessoal/admin)</option>
          {EXAMS.map((e) => (
            <option key={e.id} value={e.id}>{e.titulo}</option>
          ))}
        </select>
        <p className="sans" style={{ fontSize: 13, color: "#5C4A2E", margin: "0 0 8px" }}>Plano de acesso:</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {PLANOS.map((p) => (
            <button
              key={p.id}
              onClick={() => setNovoPlano(p.id)}
              className="sans"
              style={{ padding: "8px 14px", borderRadius: 4, border: novoPlano === p.id ? "2px solid #1B2A4A" : "1px solid #D8CBA8", background: novoPlano === p.id ? "#1B2A4A18" : "#FBF7EE", fontWeight: novoPlano === p.id ? 700 : 500, fontSize: 13 }}
            >
              {p.nome}
            </button>
          ))}
        </div>
        {novoPlano === "personalizado" && (
          <div style={{ marginBottom: 14 }}>
            <p className="sans" style={{ fontSize: 13, color: "#5C4A2E", margin: "0 0 6px" }}>Quantas horas de validade?</p>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={novasHoras}
              onChange={(e) => setNovasHoras(e.target.value)}
              placeholder="Ex: 2"
              className="sans mono"
              style={{ width: 140, padding: "10px 12px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 14 }}
            />
            <span className="sans" style={{ fontSize: 13, color: "#8A7B5C", marginLeft: 8 }}>horas</span>
          </div>
        )}
        <button onClick={adicionarCodigo} className="sans" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 4, border: "none", background: "#1B2A4A", color: "#FBF7EE", fontWeight: 700, fontSize: 14 }}><Plus size={16} /> Criar código</button>
        {msg && <p className="sans" style={{ fontSize: 13, color: "#3A5A40", marginTop: 10 }}>{msg}</p>}
      </div>
      <div style={{ background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 6, padding: 24, marginBottom: 24 }}>
        <h2 className="sans" style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px" }}>Códigos activos ({codigos.length})</h2>
        {codigos.length === 0 && <p className="sans" style={{ fontSize: 13.5, color: "#8A7B5C" }}>Nenhum código criado ainda.</p>}
        <div style={{ display: "grid", gap: 8 }}>
          {codigos.map((c) => {
            const expirado = c.expiraEm && new Date(c.expiraEm) < new Date();
            return (
              <div key={c.codigo} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: expirado ? "#F5DADA" : "#F0E6D2", borderRadius: 4 }}>
                <div>
                  <span className="mono" style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.05em" }}>{c.codigo}</span>
                  <span className="sans" style={{ fontSize: 13, color: "#5C4A2E", marginLeft: 10 }}>
                    {c.titular} · {EXAMS.find((e) => e.id === c.acesso)?.titulo || "Todos os cadernos"} · {c.plano || "sem prazo"}{c.expiraEm ? ` · expira ${new Date(c.expiraEm).toLocaleDateString("pt-PT")}` : ""}{expirado ? " · EXPIRADO" : ""}
                  </span>
                </div>
                <button onClick={() => removerCodigo(c.codigo)} className="sans" style={{ background: "transparent", border: "none", color: "#A23E2E" }}><Trash2 size={16} /></button>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ background: "#FBF7EE", border: "1px solid #D8CBA8", borderRadius: 6, padding: 24 }}>
        <h2 className="sans" style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", display: "flex", alignItems: "center", gap: 8 }}><KeyRound size={16} /> Alterar senha de administrador</h2>
        <p className="sans" style={{ fontSize: 12.5, color: "#8A7B5C", margin: "0 0 12px" }}>Senha actual por defeito: <span className="mono">{senhaPadrao}</span> (altere assim que possível)</p>
        <div style={{ display: "flex", gap: 10 }}>
          <input type="password" value={novaSenhaAdmin} onChange={(e) => setNovaSenhaAdmin(e.target.value)} placeholder="Nova senha" className="sans" style={{ flex: 1, padding: "10px 12px", borderRadius: 4, border: "1px solid #D8CBA8", fontSize: 14 }} />
          <button onClick={alterarSenhaAdmin} className="sans" style={{ padding: "10px 18px", borderRadius: 4, border: "none", background: "#2A2620", color: "#FBF7EE", fontWeight: 700, fontSize: 14 }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

