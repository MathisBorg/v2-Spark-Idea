import { Link } from "react-router-dom"

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-spark-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-spark-primary/10 border border-spark-primary/20 rounded-full text-spark-primary text-sm font-semibold mb-6">
              The Anti-Launchpad
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-fg-primary mb-6 leading-tight">
              Invest in <span className="text-spark-primary">Ideas</span>,<br />
              Not Exit Liquidity
            </h1>
            <p className="text-xl md:text-2xl text-fg-secondary mb-12 leading-relaxed">
              Stop being retail's punching bag. Fund projects from day zero.<br />
              <span className="text-fg-primary font-semibold">Be the VC, not the exit.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ideas"
                className="px-8 py-4 bg-spark-primary text-black font-bold text-lg rounded-lg hover:bg-spark-secondary transition-all hover:scale-105"
              >
                Explore Ideas →
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-bg-secondary border-2 border-spark-primary text-spark-primary font-bold text-lg rounded-lg hover:bg-spark-primary/10 transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem */}
      <div className="bg-bg-secondary border-y border-bd-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-fg-primary mb-6">
              Launchpads Are Broken
            </h2>
            <p className="text-lg text-fg-secondary leading-relaxed">
              Traditional launchpads fund projects that already raised from VCs. You get in last, after insiders loaded their bags at fractions of your entry price. <span className="text-spark-primary font-semibold">You're not early — you're exit liquidity.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🔴</div>
              <h3 className="text-xl font-bold text-fg-primary mb-2">VC Bags First</h3>
              <p className="text-fg-tertiary text-sm">
                VCs buy at $0.01. You buy at $1.00 on "public" launch. They 100x, you get dumped on.
              </p>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🔴</div>
              <h3 className="text-xl font-bold text-fg-primary mb-2">No Say, No Power</h3>
              <p className="text-fg-tertiary text-sm">
                Retail gets zero input on the project. You're just liquidity for early investors.
              </p>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🔴</div>
              <h3 className="text-xl font-bold text-fg-primary mb-2">Late to Everything</h3>
              <p className="text-fg-tertiary text-sm">
                By the time you can invest, the real gains already happened. You arrive when it's time to pump retail bags.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How Spark Works */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-fg-primary mb-4">
            How <span className="text-spark-primary">Spark</span> Works
          </h2>
          <p className="text-xl text-fg-secondary max-w-2xl mx-auto">
            We flip the script. You invest in ideas before teams exist. You choose which ideas get built.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-bg-secondary border-l-4 border-spark-primary rounded-xl p-8 hover:shadow-lg hover:shadow-spark-primary/10 transition-all">
            <div className="flex items-start gap-6">
              <div className="text-5xl">💡</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-spark-primary text-black text-sm font-bold rounded-full">STEP 1</span>
                  <h3 className="text-2xl font-bold text-fg-primary">Idea Market</h3>
                </div>
                <p className="text-fg-secondary mb-4 leading-relaxed">
                  Anyone can submit an idea. It costs $100+ USDC, which goes directly into the funding pool. The community decides which ideas deserve to exist by buying $IDEAv1 tokens.
                </p>
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4">
                  <div className="text-fg-tertiary text-sm">
                    <span className="text-spark-primary font-semibold">Early = Real Early.</span> You're funding the idea itself, before any code, any team, any VC.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-bg-secondary border-l-4 border-spark-primary rounded-xl p-8 hover:shadow-lg hover:shadow-spark-primary/10 transition-all">
            <div className="flex items-start gap-6">
              <div className="text-5xl">📈</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-spark-primary text-black text-sm font-bold rounded-full">STEP 2</span>
                  <h3 className="text-2xl font-bold text-fg-primary">Token v1 Goes Live</h3>
                </div>
                <p className="text-fg-secondary mb-4 leading-relaxed">
                  Once an idea hits its funding goal, boom — $IDEAv1 token is created and tradable. Speculation starts. Hype builds. The market decides what's hot.
                </p>
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4">
                  <div className="text-fg-tertiary text-sm">
                    <span className="text-spark-primary font-semibold">Skin in the game.</span> Token holders aren't passive — they're invested in making this idea succeed.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-bg-secondary border-l-4 border-spark-primary rounded-xl p-8 hover:shadow-lg hover:shadow-spark-primary/10 transition-all">
            <div className="flex items-start gap-6">
              <div className="text-5xl">⚡</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-spark-primary text-black text-sm font-bold rounded-full">STEP 3</span>
                  <h3 className="text-2xl font-bold text-fg-primary">10-Day Hackathon</h3>
                </div>
                <p className="text-fg-secondary mb-4 leading-relaxed">
                  Builder teams compete in a 10-day sprint to bring the idea to life. Code, product, marketing — ship or die. The best team wins.
                </p>
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4">
                  <div className="text-fg-tertiary text-sm">
                    <span className="text-spark-primary font-semibold">Builders earn it.</span> No VC nepotism. Winners are chosen by execution, not connections.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-bg-secondary border-l-4 border-spark-primary rounded-xl p-8 hover:shadow-lg hover:shadow-spark-primary/10 transition-all">
            <div className="flex items-start gap-6">
              <div className="text-5xl">🏆</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-spark-primary text-black text-sm font-bold rounded-full">STEP 4</span>
                  <h3 className="text-2xl font-bold text-fg-primary">v1 → v2 Transition</h3>
                </div>
                <p className="text-fg-secondary mb-4 leading-relaxed">
                  Winning team gets the keys. $IDEAv1 becomes illiquid. v1 holders claim their allocation on the final $PROJECTv2 token + priority access to the team's raise.
                </p>
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4">
                  <div className="text-fg-tertiary text-sm">
                    <span className="text-spark-primary font-semibold">You're first in line.</span> v1 holders get v2 tokens and priority on the raise. Still earlier than any VC.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-bg-secondary border-l-4 border-spark-primary rounded-xl p-8 hover:shadow-lg hover:shadow-spark-primary/10 transition-all">
            <div className="flex items-start gap-6">
              <div className="text-5xl">🚀</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-spark-primary text-black text-sm font-bold rounded-full">STEP 5</span>
                  <h3 className="text-2xl font-bold text-fg-primary">Launch & Scale</h3>
                </div>
                <p className="text-fg-secondary mb-4 leading-relaxed">
                  Spark helps the winning team with token launch, liquidity pools, and raise execution. The project goes live, backed by a community that believed from day zero.
                </p>
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4">
                  <div className="text-fg-tertiary text-sm">
                    <span className="text-spark-primary font-semibold">Community-first launch.</span> No VC dump. No insider allocation games. Just pure community momentum.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incentives */}
      <div className="bg-bg-secondary border-y border-bd-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-fg-primary mb-4">
              Everyone Wins
            </h2>
            <p className="text-xl text-fg-secondary">
              Aligned incentives. No extractive bullshit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-bg-default border border-bd-primary rounded-xl p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-fg-primary mb-2">Idea Submitter</h3>
              <p className="text-fg-tertiary text-sm mb-3">
                1% of final token supply + share of trading fees
              </p>
              <div className="text-spark-primary text-xs font-semibold">Rewarded for vision</div>
            </div>

            <div className="bg-bg-default border border-bd-primary rounded-xl p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-bold text-fg-primary mb-2">Winning Team</h3>
              <p className="text-fg-tertiary text-sm mb-3">
                50% of initial pool + guaranteed raise + token allocation
              </p>
              <div className="text-spark-primary text-xs font-semibold">Rewarded for execution</div>
            </div>

            <div className="bg-bg-default border border-bd-primary rounded-xl p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold text-fg-primary mb-2">v1 Holders</h3>
              <p className="text-fg-tertiary text-sm mb-3">
                Early access to v2 + priority on raise
              </p>
              <div className="text-spark-primary text-xs font-semibold">Rewarded for belief</div>
            </div>

            <div className="bg-bg-default border border-bd-primary rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-fg-primary mb-2">Other Builders</h3>
              <p className="text-fg-tertiary text-sm mb-3">
                Visibility, track record, favoritism for next season
              </p>
              <div className="text-spark-primary text-xs font-semibold">Rewarded for participation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-spark-primary/10 to-transparent border border-spark-primary/20 rounded-2xl p-12 text-center">
          <div className="inline-block px-4 py-2 bg-spark-primary text-black text-sm font-bold rounded-full mb-6">
            SEASONAL MODEL
          </div>
          <h2 className="text-4xl font-bold text-fg-primary mb-4">
            Quarterly Seasons
          </h2>
          <p className="text-lg text-fg-secondary mb-8 max-w-2xl mx-auto">
            Every 3 months: Idea submissions → Funding → Hackathon → Launch. Fresh cycles, fresh opportunities. Miss one? Catch the next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="px-6 py-3 bg-bg-secondary border border-bd-primary rounded-lg">
              <div className="text-spark-primary font-bold text-sm mb-1">CURRENT SEASON</div>
              <div className="text-fg-primary text-2xl font-bold">Q1 2024</div>
            </div>
            <div className="px-6 py-3 bg-bg-secondary border border-bd-primary rounded-lg">
              <div className="text-fg-secondary font-bold text-sm mb-1">STATUS</div>
              <div className="text-spark-primary text-2xl font-bold">Live</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-bg-secondary border-y border-bd-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-fg-primary mb-6">
            Stop Being Exit Liquidity
          </h2>
          <p className="text-xl text-fg-secondary mb-10 leading-relaxed">
            Traditional launchpads serve VCs. Spark serves builders and believers.<br />
            <span className="text-spark-primary font-semibold">Be early. Actually early.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ideas"
              className="px-8 py-4 bg-spark-primary text-black font-bold text-lg rounded-lg hover:bg-spark-secondary transition-all hover:scale-105"
            >
              Explore Ideas →
            </Link>
            <Link
              to="/teams"
              className="px-8 py-4 bg-bg-default border-2 border-spark-primary text-spark-primary font-bold text-lg rounded-lg hover:bg-spark-primary/10 transition-colors"
            >
              Join as Builder
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-fg-tertiary text-sm">
          Built on Solana. Powered by community. No VCs dumping on you.
        </p>
      </div>
    </div>
  )
}
