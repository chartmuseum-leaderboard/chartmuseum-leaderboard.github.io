import { scoresData } from "@/app/data";
import Leaderboard from "@/components/Leaderboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col lg:w-[800px] mx-auto p-4">
      <div className="mx-4 justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-[60px] h-[60px] relative mr-2">
              <Image
                src="/site-logo.png"
                alt="ChartMuseum Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="md:text-5xl text-3xl font-bold tracking-tight">
              ChartMuseum Leaderboard
            </h1>
          </div>
          <div className="lg:mb-6 mb-2 flex flex-wrap justify-center gap-2 text-xl md:text-2xl">
            <Link
              href="https://github.com/Liyan06/ChartMuseum"
              target="_blank"
              className="inline-flex items-center custom-link font-medium hover:underline"
            >
              GitHub
              <FontAwesomeIcon
                className="mx-1.5"
                icon={faGithub}
                width="24"
                height="24"
              />
            </Link>
            <span className="hidden md:inline">&bull;</span>
            <Link
              href=""
              target="_blank"
              className="inline-flex items-center custom-link font-medium hover:underline"
            >
              Paper
              <Image
                src="/arxiv-logomark-small.svg"
                className="mx-1.5"
                alt="arxiv"
                width="16"
                height="16"
              />
            </Link>
            <span className="hidden md:inline">&bull;</span>
            <Link
              href="https://huggingface.co/datasets/lytang/ChartMuseum"
              target="_blank"
              className="inline-flex items-center custom-link font-medium hover:underline"
            >
              Hugging Face
              <Image
                src="/hf.svg"
                className="mx-1.5"
                alt="hf"
                width="36"
                height="36"
              />
            </Link>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-screen relative left-1/2 right-1/2 mx-[-50vw] my-8">
            <div className="flex justify-center">
              <Image
                src="https://raw.githubusercontent.com/Liyan06/ChartMuseum/main/assets/figure-main.png"
                alt="ChartMuseum Overview"
                width={1300} // Increased width
                height={1000} // Adjusted height proportionally
                className="shadow-md"
                priority
              />
            </div>
          </div>
          <p className="leading-normal">
            <span className="font-bold">ChartMuseum</span> is a chart question
            answering benchmark designed to evaluate reasoning capabilities of
            large vision-language models (LVLMs) over real-world chart images. We
            categorize the questions into four types:
          </p>

          <ul className="list-disc list-inside mb-4 pl-6">
            <li>
              <span className="font-bold">Textual</span> reasoning questions can
              be solved almost exclusively with textual reasoning.
            </li>
            <li>
              <span className="font-bold">Visual</span> reasoning questions are
              most easily answerable from visual aspects of the chart.
            </li>
            <li>
              <span className="font-bold">Text/Visual</span> reasoning questions
              can be answered by either primarily text or primarily visual
              reasoning.
            </li>
            <li>
              <span className="font-bold">Synthesis</span> reasoning questions
              require both textual and visual reasoning.
            </li>
          </ul>

          <p className="leading-normal">
            <em>
              Human performance on ChartMuseum is{" "}
              <span className="font-bold">93%</span>.
            </em>{" "}
            Examples from ChartMuseum are available{" "}
            <a href="/examples" className="custom-link">
              here
            </a>.
          </p>
        </div>
        <div className="rounded-lg">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="key-features">
              <AccordionTrigger>
                <h2>Benchmark Details</h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-normal">
                  <span className="aggrefact">ChartMuseum</span> consists of 1162{" "}
                  <u>(image, question, short answer)</u> tuples and exclusively
                  targets at questions that requires non-trivial textual and
                  visual reasoning skills. The dataset is collectively annotated
                  by a team of 13 researchers in computer science.
                </p>

                <p className="leading-normal">
                  <br></br>The dataset is divided into dev/test splits, with 162/1000 examples, respectively.
                  The breakdown of the question types in the test set is as follows: visual (510), synthesis (133),
                  visual/textual (234), text (123). We report model accuracies on each question type and also the overall accuracy. The overall accuracy is calculated over the entire test set.
                </p>

                <p className="leading-normal">
                  <br></br>All questions in ChartMuseum have unique answers and
                  we use LLM-as-a-Judge as the main evaluation method to account
                  for paraphrases. The evaluation code is available at our GitHub
                  repo.
                </p>

                <p className="leading-normal">
                  <br></br>Formal definition of textual and visual reasoning can
                  be found in our paper.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Leaderboard scoresData={scoresData}></Leaderboard>
      <div className="rounded-lg">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="author" className="flex-shrink">
            <AccordionTrigger>
              <h2>Team</h2>
            </AccordionTrigger>
            <AccordionContent>
              <h3 className="text-xl font-semibold mb-6 text-center">The University of Texas at Austin</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto gap-x-4 gap-y-8">
                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/Liyan.png"
                    alt="Liyan Tang"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.tangliyan.com"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Liyan Tang
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/grace.jpg"
                    alt="Grace Kim"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://taur.cs.utexas.edu/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Grace Kim
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/lucy.jpg"
                    alt="Xinyu Zhao"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://xinyuzhao.io"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Xinyu Zhao
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/thom.png"
                    alt="Thom Lake"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://thomlake.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Thom Lake
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/wenxuan.png"
                    alt="Wenxuan Ding"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://wenwen-d.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Wenxuan Ding
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/fangcong.png"
                    alt="Fangcong Yin"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://fangcong-yin-2.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Fangcong Yin
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/prasann.png"
                    alt="Prasann Singhal"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://prasanns.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Prasann Singhal
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/manya.png"
                    alt="Manya Wadhwa"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://manyawadhwa.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Manya Wadhwa
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/leo.png"
                    alt="Zeyu Leo Liu"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://leo-liuzy.github.io/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Zeyu Leo Liu
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/zayne.png"
                    alt="Zayne Rea Sprague"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://zaynesprague.com/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Zayne Sprague
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/ramya.png"
                    alt="Ramya Namuduri"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.linkedin.com/in/namuduri-ramya&ved=2ahUKEwjvh6-x1KmNAxWQMlkFHVyLLsAQFnoECBcQAQ&usg=AOvVaw2XH6vk8tDN-EjT0trJMfA7"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Ramya Namuduri
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/bodun.png"
                    alt="Bodun Hu"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.bodunhu.com"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Bodun Hu
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/juandiego.jpg"
                    alt="Juan Diego Rodriguez"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.juandiego-rodriguez.com/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Juan Diego Rodriguez
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/puyuan.jpg"
                    alt="Puyuan Peng"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://jasonppy.github.io"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Puyuan Peng
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/greg.png"
                    alt="Greg Durrett"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.cs.utexas.edu/~gdurrett/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Greg Durrett
                  </Link>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="citaiton">
            <AccordionTrigger>
              <h2>Citation</h2>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
                {
//                 `@InProceedings{tang-etal-2024-minicheck,
//   title = {MiniCheck: Efficient Fact-Checking of LLMs on Grounding Documents},
//   author = {Liyan Tang and Philippe Laban and Greg Durrett},
//   booktitle = {Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing},
//   year = {2024},
//   publisher = {Association for Computational Linguistics},
//   url = {https://arxiv.org/pdf/2404.10774}
// }`
}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
