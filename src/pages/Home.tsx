import { Link } from "react-router-dom"
import { mockIdeas, mockTeams } from "../data/mockData"

export function Home() {
  const featuredIdeas = mockIdeas.filter((idea) => idea.status === "active").slice(0, 3)
  const featuredTeams = mockTeams.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-fg-primary mb-6">
          Got a Bold Idea?
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold text-spark-primary mb-8">
          SPARK IT! ⚡
        </h2>
        <p className="text-xl text-fg-secondary max-w-3xl mx-auto mb-12">
          Fund innovative ideas. Support visionary teams. Build the future together on Solana.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/ideas"
            className="px-8 py-4 bg-spark-primary text-black font-bold text-lg rounded-lg hover:bg-spark-secondary transition-colors"
          >
            Explore Ideas
          </Link>
          <Link
            to="/teams"
            className="px-8 py-4 bg-bg-secondary border-2 border-spark-primary text-spark-primary font-bold text-lg rounded-lg hover:bg-spark-primary/10 transition-colors"
          >
            Meet Teams
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-bg-secondary border-y border-bd-primary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-spark-primary mb-2">
                ${(mockIdeas.reduce((sum, idea) => sum + idea.currentFunding, 0) / 1000000).toFixed(1)}M+
              </div>
              <div className="text-fg-secondary">Total Funding</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-spark-primary mb-2">
                {mockIdeas.reduce((sum, idea) => sum + idea.backers, 0)}+
              </div>
              <div className="text-fg-secondary">Backers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-spark-primary mb-2">
                {mockIdeas.length}
              </div>
              <div className="text-fg-secondary">Active Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Ideas */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-fg-primary">
            🔥 Hot Ideas
          </h2>
          <Link
            to="/ideas"
            className="text-spark-primary hover:underline font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredIdeas.map((idea) => {
            const percentage = Math.round((idea.currentFunding / idea.fundingGoal) * 100)
            return (
              <Link
                key={idea.id}
                to={`/ideas/${idea.id}`}
                className="bg-bg-secondary border border-bd-primary rounded-xl overflow-hidden hover:border-spark-primary transition-all hover:shadow-lg hover:shadow-spark-primary/20"
              >
                <div className="aspect-video bg-bg-tertiary flex items-center justify-center text-6xl">
                  {idea.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-fg-primary mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-fg-secondary text-sm mb-4">
                    {idea.tagline}
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-fg-secondary">Progress</span>
                      <span className="text-spark-primary font-semibold">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-bg-tertiary rounded-full h-2">
                      <div
                        className="bg-spark-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fg-tertiary">
                      <span className="text-fg-primary font-semibold">
                        ${(idea.currentFunding / 1000).toFixed(0)}K
                      </span>{" "}
                      raised
                    </span>
                    <span className="text-spark-primary font-semibold">
                      {idea.daysLeft}d left
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Featured Teams */}
      <div className="bg-bg-secondary border-y border-bd-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-fg-primary">
              ⭐ Featured Teams
            </h2>
            <Link
              to="/teams"
              className="text-spark-primary hover:underline font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTeams.map((team) => {
              return (
                <Link
                  key={team.id}
                  to={`/teams/${team.id}`}
                  className="bg-bg-default border border-bd-primary rounded-xl p-8 hover:border-spark-primary transition-all hover:shadow-lg hover:shadow-spark-primary/20"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-7xl">{team.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-fg-primary mb-2">
                        {team.name}
                      </h3>
                      <p className="text-fg-secondary text-sm mb-3">{team.tagline}</p>
                      <span className="inline-block px-3 py-1 bg-spark-primary/10 text-spark-primary text-xs font-semibold rounded-full border border-spark-primary/20">
                        {team.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-fg-tertiary text-sm mb-6 leading-relaxed line-clamp-2">
                    {team.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-bd-secondary">
                    <span className="text-fg-tertiary text-sm">
                      👥 {team.members} members
                    </span>
                    <span className="text-spark-primary font-semibold text-sm">
                      Learn More →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-fg-primary mb-4">
          Ready to Make an Impact?
        </h2>
        <p className="text-xl text-fg-secondary mb-8 max-w-2xl mx-auto">
          Join thousands of backers supporting innovative ideas. Every contribution matters.
        </p>
        <Link
          to="/ideas"
          className="inline-block px-8 py-4 bg-spark-primary text-black font-bold text-lg rounded-lg hover:bg-spark-secondary transition-colors"
        >
          Start Backing Ideas Today
        </Link>
      </div>
    </div>
  )
}
