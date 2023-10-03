<template>
  <div class="text-center bg-surface-variant" v-if="user && userInfos">
    <v-dialog v-model="dialog1" width="500" transition="dialog-top-transition">
      <v-card>
        <v-toolbar color="primary" title="Welcome"></v-toolbar>
        <v-card-text>
          <P class="pa-12"
            >Hi
            <span style="font-weight: bold">{{ userInfos.firstName }}</span>
            welcome to the serious part let's join hands and fight that failure!
            Wish you luck🤩</P
          >
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="dialog1 = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 100 level courses -->
    <v-row justify="center">
      <v-dialog
        v-model="_100FirstSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_100FirstSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>First Semester - 100</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _100FirstSemesterCourses"
                :key="course.title"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn
                        border
                        router
                        :to="{
                          name: 'quiz',
                          params: {
                            courseCode: course.code,
                          },
                        }"
                        >Take Quiz</v-btn
                      >
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="_100SecondSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_100SecondSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Second Semester - 100</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _100SecondSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- 200 level courses -->
    <v-row justify="center">
      <v-dialog
        v-model="_200FirstSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_200FirstSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>First Semester - 200</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _200FirstSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="_200SecondSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_200SecondSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Second Semester - 200</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _200SecondSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- 300 level courses -->
    <v-row justify="center">
      <v-dialog
        v-model="_300FirstSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_300FirstSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>First Semester - 300</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _300FirstSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- 400 level courses -->
    <v-row justify="center">
      <v-dialog
        v-model="_400FirstSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_400FirstSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>First Semester - 400</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _400FirstSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="_400SecondSemester"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="_400SecondSemester = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Second Semester - 400</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-row justify="space-evenly">
              <v-col
                cols="12"
                sm="4"
                id="column"
                v-for="course in _400SecondSemesterCourses"
                :key="course.code"
              >
                <v-card
                  image="/level.jpg"
                  permanent
                  theme="dark"
                  height="220"
                  class="d-flex flex-column align-item-center"
                >
                  <h1 class="txt text-capitalize">{{ course.title }}</h1>
                  <div class="card-wrap">
                    <h4 class="text-capitalize">{{ course.title }}</h4>
                    <p class="text-uppercase">{{ course.code }}</p>
                    <p>
                      {{ course.description }}
                    </p>

                    <v-card-actions class="d-flex justify-space-evenly">
                      <v-btn border>Study</v-btn>
                      <v-btn border>Take Quiz</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- page contents -->
    <v-container>
      <v-row justify="space-evenly">
        <v-col cols="12" sm="4" id="column">
          <v-card
            image="/level.jpg"
            permanent
            theme="dark"
            height="220"
            class="d-flex flex-column align-item-center"
          >
            <h1 class="txt">100 LEVEL</h1>
            <div class="card-wrap">
              <h4>100 LEVEL</h4>
              <p>Study</p>
              <p>
                All 100 level courses and lecture guide, to help boost learning
                progress.
              </p>

              <v-card-actions class="d-flex justify-space-evenly">
                <v-btn border @click="_100FirstSemester = true"
                  >First semester</v-btn
                >
                <v-btn border @click="_100SecondSemester = true"
                  >Second semester</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" id="column">
          <v-card
            image="/level2.jpg"
            permanent
            theme="dark"
            height="220"
            class="d-flex flex-column align-item-center"
          >
            <h1 class="txt">200 LEVEL</h1>
            <div class="card-wrap">
              <h4>200 LEVEL</h4>
              <p>Study</p>
              <p>
                All 200 level courses and lecture guide, to help boost learning
                progress.
              </p>

              <v-card-actions class="d-flex justify-space-evenly">
                <v-btn border @click="_200FirstSemester = true"
                  >First semester</v-btn
                >
                <v-btn border @click="_200SecondSemester = true"
                  >Second semester</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-evenly">
        <v-col cols="12" sm="4" id="column">
          <v-card
            image="/level3.jpg"
            permanent
            theme="dark"
            height="220"
            class="d-flex flex-column align-item-center"
          >
            <h1 class="txt">300 LEVEL</h1>
            <div class="card-wrap">
              <h4>300 LEVEL</h4>
              <p>Study</p>
              <p>
                All 300 level courses and lecture guide, to help boost learning
                progress.
              </p>

              <v-card-actions class="d-flex justify-space-evenly">
                <v-btn border @click="_300FirstSemester = true"
                  >First semester</v-btn
                >
                <v-btn border disabled>Second semester</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" id="column">
          <v-card
            image="/level4.jpg"
            permanent
            theme="dark"
            height="220"
            class="d-flex flex-column align-item-center"
          >
            <h1 class="txt">400 LEVEL</h1>
            <div class="card-wrap">
              <h4>400 LEVEL</h4>
              <p>Study</p>
              <p>
                All 400 level courses and lecture guide, to help boost learning
                progress.
              </p>

              <v-card-actions class="d-flex justify-space-evenly">
                <v-btn border @click="_400FirstSemester = true"
                  >First semester</v-btn
                >
                <v-btn border @click="_400SecondSemester = true"
                  >Second semester</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.state.user);
const userInfos = computed(() => store.state.userData);

const dialog1 = ref(true);
const _100FirstSemester = ref(false);
const _100SecondSemester = ref(false);
const _200FirstSemester = ref(false);
const _200SecondSemester = ref(false);
const _300FirstSemester = ref(false);
const _400FirstSemester = ref(false);
const _400SecondSemester = ref(false);

//100 level courses
const _100FirstSemesterCourses = [
  {
    code: "GSP1201",
    title: "Use Of English",
    description:
      " A course providing a comprehensive review of English language fundamentals, including grammar and communication skills.",
  },
  {
    code: "CSC1201",
    title: "Introduction to Computer Science",
    description:
      "An introductory course exploring computer science concepts, programming, and technology.",
  },
  {
    code: "PHY1107",
    title: "Practical Physics I",
    description:
      "Hands-on experiments and fundamental physics principles exploration.",
  },
  {
    code: "PHY1211",
    title: "Introduction to Mechanics and Waves",
    description: " Study of motion, forces, and wave phenomena.",
  },
  {
    code: "PHY1231",
    title: "introduction to properties of matter",
    description: " Understanding matter at atomic and molecular levels.",
  },
  {
    code: "BIO1203",
    title: "general biology I",
    description:
      "Core biology concepts, including cellular biology and genetics.",
  },
  {
    code: "BIO1201",
    title: "general biology III",
    description:
      "Deeper exploration of biology, covering ecology, physiology, and biodiversity.",
  },
  {
    code: "MTH1301",
    title: "algebra and trigonometry",
    description: " Mastery of algebraic and trigonometric mathematical skills.",
  },
  {
    code: "CHM1231",
    title: "inorganic chemistry I",
    description:
      "Foundations of inorganic chemistry and non-organic compounds.",
  },
  {
    code: "CHM1251",
    title: "physical chemistry I",
    description:
      " Study of chemical reactions, thermodynamics, and molecular behavior.",
  },
];
const _100SecondSemesterCourses = [
  {
    code: "GSP1202",
    title: "foundation of nigerian culture",
    description:
      "A course delving into the cultural heritage and traditions of Nigeria.",
  },
  {
    code: "GSP1206",
    title: "library skills",
    description:
      "Develop essential skills for effective use of library resources and research.",
  },
  {
    code: "CHM1242",
    title: "organic chemistry I",
    description:
      "Study the fundamental principles of organic chemistry and the properties of carbon-based compounds.",
  },
  {
    code: "CHM1261",
    title: "practical chemistry I",
    description:
      " Hands-on laboratory experiments and applications of chemical concepts.",
  },
  {
    code: "PHY1108",
    title: "practical physics II",
    description:
      " Further exploration of practical physics experiments and concepts.",
  },
  {
    code: "PHY1222",
    title: "introduction to electricity and magnetism",
    description:
      "Study the fundamental principles of electricity and magnetism.",
  },
  {
    code: "BIO1204",
    title: "general biology IV",
    description:
      "Continue the study of biology, focusing on advanced topics in the field.",
  },
  {
    code: "BIO1202",
    title: "general biology II",
    description:
      " Build upon the basics of biology, covering diverse aspects of the subject.",
  },
  {
    code: "MTH1304",
    title: "calculus and it's application",
    description:
      "An exploration of calculus and its real-world applications in various fields.",
  },
];

// 200 level courses
const _200FirstSemesterCourses = [
  {
    code: "BCH2301",
    title: "general biochemistry I",
    description:
      "Explore the fundamentals of biochemistry, focusing on biomolecules and their functions in living organisms.",
  },
  {
    code: "BCH2101",
    title: "methods in biochemistry",
    description:
      " Learn essential methods and techniques used in biochemical research and analysis.",
  },
  {
    code: "BCH2121",
    title: "biochemistry lab I",
    description:
      "Engage in hands-on laboratory work, applying biochemistry principles to experiments.",
  },
  {
    code: "Chm2241",
    title: "organic chemistry II",
    description:
      "Continue the study of organic chemistry, covering more advanced topics and reactions of carbon-based compounds.",
  },
  {
    code: "chm2251",
    title: "physical chemistry II",
    description:
      "Dive deeper into physical chemistry, examining advanced concepts in chemical thermodynamics and kinetics.",
  },
  {
    code: "mcb2301",
    title: "general microbiology I",
    description:
      "Study the basics of microbiology, including the structure and function of microorganisms.",
  },
  {
    code: "bio2201",
    title: "genetics I",
    description:
      " Explore the principles of genetics, including inheritance patterns and genetic variation.",
  },
  {
    code: "gsp2207",
    title: "peace and conflict resolution",
    description:
      "Gain insight into strategies and methods for promoting peace and resolving conflicts.",
  },
  {
    code: "gsp2201",
    title: "use of english(DE students)",
    description:
      " A course tailored for Direct Entry (DE) students, focusing on English language skills and communication.",
  },
];
const _200SecondSemesterCourses = [
  {
    code: "bch2302",
    title: "general biochemistry II",
    description:
      "Build upon the fundamentals of biochemistry, exploring advanced topics in biomolecular science.",
  },
  {
    code: "bch2122",
    title: "biochemistry lab II",
    description:
      " Continue hands-on laboratory work in biochemistry, conducting experiments and analyses.",
  },
  {
    code: "bch2204",
    title: "metabolism of carbohydrates",
    description:
      "Study the biochemical pathways and processes involved in carbohydrate metabolism.",
  },
  {
    code: "chm2242",
    title: "organic chemistry III",
    description:
      " Further advance your knowledge of organic chemistry, covering complex organic reactions and compounds.",
  },
  {
    code: "chm2232",
    title: "inorganic chemistry II",
    description:
      "Explore advanced topics in inorganic chemistry, including the properties and behavior of inorganic compounds.",
  },
  {
    code: "chm2261",
    title: "chemistry practical II",
    description:
      "Engage in practical chemistry experiments and applications, expanding your laboratory skills.",
  },
  {
    code: "bio2204",
    title: "biological techniques",
    description:
      "Learn essential techniques and methods used in biological research and analysis.",
  },
  {
    code: "bio2206",
    title: "biostatics",
    description:
      "Gain proficiency in statistical analysis as it applies to biological data and research.",
  },
  {
    code: "csc2244",
    title: "application of computer science",
    description:
      " Apply computer science concepts and skills to practical real-world applications.",
  },
  {
    code: "gsp2208",
    title: "nigerian government and economy",
    description:
      " Explore the structure of the Nigerian government and its impact on the economy.",
  },
  {
    code: "gsp2202",
    title: "foundation of nigerian culture(DE students)",
    description:
      " A course tailored for Direct Entry (DE) students, focusing on Nigerian cultural heritage and traditions.",
  },
  {
    code: "gsp2206",
    title: "Library skills(DE students)",
    description:
      "Develop essential skills for effective use of library resources and research, designed for Direct Entry (DE) students.",
  },
];

// 300 level courses
const _300FirstSemesterCourses = [
  {
    code: "bch3109",
    title: "bioenergetics and biological oxidation",
    description:
      "Explore the energetics of biological processes and the oxidation reactions crucial for cellular energy production.",
  },
  {
    code: "bch3121",
    title: "general biochemistry practical's III",
    description:
      "Advance your practical skills in biochemistry through laboratory experiments.",
  },
  {
    code: "bch3201",
    title: "metabolism of amino acids",
    description:
      " Dive into the metabolic pathways involving amino acids in biological systems.",
  },
  {
    code: "bch3203",
    title: "metabolism of lipids",
    description:
      "Study the biochemical processes related to lipid metabolism and their significance in living organisms.",
  },
  {
    code: "bch3209",
    title: "food and nutritional biochemistry",
    description:
      " Explore the biochemistry of food components and their nutritional impact on health.",
  },
  {
    code: "bch3301",
    title: "enzymology",
    description:
      "Investigate the properties and functions of enzymes, essential catalysts in biological reactions.",
  },
  {
    code: "bch3305",
    title: "microbiological genetics and molecular biology",
    description:
      "Delve into the genetic and molecular aspects of microbiology, focusing on microbial genetics.",
  },
  {
    code: "chm3211",
    title: "instrumental methods of analysis",
    description:
      "Learn advanced techniques and instruments used in chemical analysis.",
  },
  {
    code: "chm3241",
    title: "organic chemistry IV",
    description:
      "Continue the study of organic chemistry, covering advanced organic reactions and synthesis.",
  },
  {
    code: "chm3251",
    title: "physical chemistry III",
    description:
      "Explore advanced topics in physical chemistry, including quantum mechanics and spectroscopy.",
  },
  {
    code: "pys3211",
    title: "general physiology I",
    description:
      "Study the principles of physiology, including the function of biological systems and organs.",
  },
  {
    code: "pys3213",
    title: "general physiology II",
    description:
      "Further advance your knowledge of physiology, exploring additional aspects of biological function.",
  },
  {
    code: "gsp3201",
    title: "entrepreneurship education",
    description:
      "Develop entrepreneurial skills and knowledge, preparing for business and innovation opportunities.",
  },
];

// 400 level courses
const _400FirstSemesterCourses = [
  {
    code: "bch4103",
    title: "biosynthesis of macromolecules",
    description:
      " Study the intricate processes involved in the synthesis of biological macromolecules.",
  },
  {
    code: "bch4107",
    title: "membrane biochemistry",
    description:
      "Explore the biochemistry of cell membranes and their role in cellular function.",
  },
  {
    code: "bch4201",
    title: "advanced enzymology",
    description:
      "Dive deeper into the study of enzymes and their catalytic mechanisms.",
  },
  {
    code: "bch4205",
    title: "metabolism of nucleic acid",
    description:
      " Investigate the metabolic pathways and regulation of nucleic acids in living organisms.",
  },
  {
    code: "bch4207",
    title: "plant biochemistry",
    description:
      "Focus on the biochemistry of plants, including their growth, development, and biochemical processes.",
  },
  {
    code: "bch4209",
    title: "advanced biochemical method",
    description:
      " Learn advanced techniques and methodologies used in biochemical research.",
  },
  {
    code: "bch4211",
    title: "metabolic regulation",
    description:
      "Explore the mechanisms and factors that regulate metabolic pathways in cells.",
  },
  {
    code: "4303",
    title: "immunology",
    description:
      "Study the principles of immunology, including the immune system's response to pathogens and diseases.",
  },
  {
    code: "bch4311",
    title: "industrial biochemistry",
    description:
      " Examine the application of biochemistry in industrial processes and biotechnology.",
  },
  {
    code: "gsp4201",
    title: "entrepreneurial educational skills",
    description:
      "Develop essential entrepreneurial skills and knowledge, preparing for business and innovation opportunities.",
  },
];
const _400SecondSemesterCourses = [
  {
    code: "bch4102",
    title: "tissue biochemistry",
    description:
      "Study the biochemistry of tissues in living organisms, focusing on their composition and function.",
  },
  {
    code: "bch4104",
    title: "bioinorganic chemistry",
    description:
      " Explore the role of inorganic elements and compounds in biological systems.",
  },
  {
    code: "bch4108",
    title: "biochemical reasoning",
    description:
      " Enhance your analytical and reasoning skills in biochemistry, solving complex biochemical problems.",
  },
  {
    code: "bch4210",
    title: "special topics and seminar in biochemistry",
    description:
      "Engage in in-depth exploration of specialized topics in biochemistry through seminars and discussions.",
  },
  {
    code: "bch4214",
    title: "pharmacological biochemistry",
    description:
      " Examine the biochemical basis of drug actions and their impact on biological systems.",
  },
  {
    code: "4314",
    title: "biotechnology and genetic engineering",
    description:
      "Explore the principles and applications of biotechnology and genetic engineering in biomedicine and industry.",
  },
  {
    code: "bch4612",
    title: "research project",
    description:
      " Conduct an independent research project in biochemistry, contributing to the field's advancement.",
  },
];
</script>

<style scoped>
.text-center {
  padding-top: 1.5rem;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.card-wrap {
  height: 100%;
  width: 100%;
  background: #000000b4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  transform: translateY(15rem);
  transition: all 0.5s;
}

.txt {
  transform: translateY(3rem);
  position: absolute;
  left: 3rem;
  transition: all 0.5s;
}

#column:hover .txt {
  transform: translateY(-10rem);
}

#column:hover .card-wrap {
  transform: translateY(0);
}
</style>
